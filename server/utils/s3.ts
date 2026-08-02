import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

export interface S3Config {
  region: string
  endpoint: string
  bucketName: string
  accessKeyId: string
  secretAccessKey: string
  publicUrlBase?: string
}

function createClient(config: S3Config) {
  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    }
  })
}

function getPublicUrlBase(config: S3Config) {
  if (config.publicUrlBase) return config.publicUrlBase.replace(/\/$/, '')
  // Best-effort derivation from the S3-compatible endpoint (Supabase Storage):
  // https://<ref>.storage.supabase.co/storage/v1/s3 -> https://<ref>.storage.supabase.co/storage/v1/object/public
  return config.endpoint.replace(/\/s3\/?$/, '/object/public')
}

function sanitizeExtension(filename: string) {
  const match = /\.([a-zA-Z0-9]+)$/.exec(filename || '')
  return match ? `.${match[1].toLowerCase()}` : ''
}

// Pure S3 upload, usable both from Nitro request handlers and standalone
// scripts (e.g. scripts/migrate-assets-to-s3.ts) that run outside the Nitro
// runtime and therefore can't call useRuntimeConfig().
export async function uploadFileToS3(config: S3Config, buffer: Buffer, contentType: string, originalFilename: string, keyPrefix = 'uploads') {
  const key = `${keyPrefix}/${randomUUID()}${sanitizeExtension(originalFilename)}`

  await createClient(config).send(new PutObjectCommand({
    Bucket: config.bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000'
  }))

  return `${getPublicUrlBase(config)}/${config.bucketName}/${key}`
}

function runtimeS3Config(): S3Config {
  const runtimeConfig = useRuntimeConfig()
  return {
    region: runtimeConfig.s3Region,
    endpoint: runtimeConfig.s3EndpointUrl,
    bucketName: runtimeConfig.s3BucketName,
    accessKeyId: runtimeConfig.s3AccessKeyId,
    secretAccessKey: runtimeConfig.s3SecretAccessKey,
    publicUrlBase: runtimeConfig.s3PublicUrlBase
  }
}

export function uploadImage(buffer: Buffer, contentType: string, originalFilename: string, keyPrefix = 'uploads') {
  return uploadFileToS3(runtimeS3Config(), buffer, contentType, originalFilename, keyPrefix)
}

/** Construye la URL pública de una clave del bucket. */
export function publicUrlForKey(key: string) {
  const config = runtimeS3Config()
  return `${getPublicUrlBase(config)}/${config.bucketName}/${key}`
}

/**
 * Extrae la clave del objeto a partir de su URL pública. Devuelve `null` si la
 * URL no pertenece a este bucket (p. ej. una imagen antigua servida desde
 * `/assets/`), lo que evita borrados accidentales fuera de la biblioteca.
 */
export function keyFromPublicUrl(url: string): string | null {
  const config = runtimeS3Config()
  const prefix = `${getPublicUrlBase(config)}/${config.bucketName}/`
  if (!url || !url.startsWith(prefix)) return null
  const key = url.slice(prefix.length)
  return key.length ? decodeURIComponent(key) : null
}

export interface MediaObject {
  key: string
  url: string
  name: string
  size: number
  lastModified: string | null
  kind: 'image' | 'document' | 'other'
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'avif'])

function kindForKey(key: string): MediaObject['kind'] {
  const ext = key.split('.').pop()?.toLowerCase() || ''
  if (IMAGE_EXTENSIONS.has(ext)) return 'image'
  if (ext === 'pdf') return 'document'
  return 'other'
}

/** Lista los objetos del bucket bajo un prefijo (paginando hasta `limit`). */
export async function listMedia(prefix = '', limit = 1000): Promise<MediaObject[]> {
  const config = runtimeS3Config()
  const client = createClient(config)
  const urlBase = `${getPublicUrlBase(config)}/${config.bucketName}`
  const objects: MediaObject[] = []

  let continuationToken: string | undefined

  do {
    const response: any = await client.send(new ListObjectsV2Command({
      Bucket: config.bucketName,
      Prefix: prefix || undefined,
      ContinuationToken: continuationToken,
      MaxKeys: Math.min(1000, limit - objects.length)
    }))

    for (const item of response.Contents || []) {
      if (!item.Key || item.Key.endsWith('/')) continue
      objects.push({
        key: item.Key,
        url: `${urlBase}/${item.Key}`,
        name: item.Key.split('/').pop() || item.Key,
        size: Number(item.Size || 0),
        lastModified: item.LastModified ? new Date(item.LastModified).toISOString() : null,
        kind: kindForKey(item.Key)
      })
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
  } while (continuationToken && objects.length < limit)

  return objects.sort((a, b) => (b.lastModified || '').localeCompare(a.lastModified || ''))
}

export async function deleteMedia(key: string) {
  const config = runtimeS3Config()
  await createClient(config).send(new DeleteObjectCommand({
    Bucket: config.bucketName,
    Key: key
  }))
}
