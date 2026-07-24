import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
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

export function uploadImage(buffer: Buffer, contentType: string, originalFilename: string, keyPrefix = 'uploads') {
  const runtimeConfig = useRuntimeConfig()
  return uploadFileToS3({
    region: runtimeConfig.s3Region,
    endpoint: runtimeConfig.s3EndpointUrl,
    bucketName: runtimeConfig.s3BucketName,
    accessKeyId: runtimeConfig.s3AccessKeyId,
    secretAccessKey: runtimeConfig.s3SecretAccessKey,
    publicUrlBase: runtimeConfig.s3PublicUrlBase
  }, buffer, contentType, originalFilename, keyPrefix)
}
