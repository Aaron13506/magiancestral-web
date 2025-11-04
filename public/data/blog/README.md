# Sistema de Blog - Instrucciones

## Cómo agregar un nuevo artículo

Para agregar un nuevo artículo al blog, sigue estos pasos:

### 1. Crear el archivo JSON del artículo

Crea un nuevo archivo en `public/data/blog/` con el nombre del slug del artículo (ejemplo: `mi-articulo.json`).

Estructura del archivo JSON:

```json
{
  "slug": "mi-articulo",
  "title": "Título del Artículo",
  "description": "Descripción corta del artículo que aparecerá en la lista y en metadatos",
  "date": "2025-01-25",
  "image": "/assets/images/blog/mi-imagen.jpg",
  "author": "Admin",
  "content": "<h1>Título del artículo</h1>\n\n<p>Contenido en HTML...</p>"
}
```

**Campos:**
- `slug`: URL del artículo (solo letras minúsculas, números y guiones)
- `title`: Título completo del artículo
- `description`: Resumen breve (150-200 caracteres)
- `date`: Fecha en formato YYYY-MM-DD
- `image`: Ruta a la imagen principal (debe estar en `/assets/images/blog/`)
- `author`: Nombre del autor
- `content`: Contenido HTML del artículo (ver formato abajo)

### 2. Formato del contenido HTML

El contenido debe estar en HTML. Ejemplos de elementos comunes:

```html
<!-- Títulos -->
<h1>Título principal</h1>
<h2>Subtítulo</h2>
<h3>Subtítulo menor</h3>

<!-- Párrafos -->
<p>Texto del párrafo.</p>

<!-- Listas -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>Primer punto</li>
  <li>Segundo punto</li>
</ol>

<!-- Énfasis -->
<strong>Texto en negrita</strong>
<em>Texto en cursiva</em>

<!-- Enlaces -->
<a href="https://ejemplo.com" target="_blank" rel="noopener">Texto del enlace</a>

<!-- Separadores -->
<hr>

<!-- Blockquotes -->
<blockquote>Texto citado</blockquote>
```

### 3. Actualizar el índice

Agrega la información del artículo al archivo `public/data/blog/index.json` (al inicio del array para que aparezca primero):

```json
[
  {
    "slug": "mi-articulo",
    "title": "Título del Artículo",
    "description": "Descripción corta del artículo",
    "date": "2025-01-25",
    "image": "/assets/images/blog/mi-imagen.jpg",
    "author": "Admin"
  },
  // ... artículos existentes
]
```

### 4. Actualizar configuración de prerender (opcional)

Si quieres que el artículo se genere estáticamente, agrégalo en `nuxt.config.ts`:

```typescript
nitro: {
  prerender: {
    routes: [
      '/',
      '/blog',
      '/blog/mi-articulo',  // <-- Agregar aquí
      // ... otras rutas
    ]
  }
}
```

### 5. Deploy

Haz commit y push de los cambios. Vercel detectará automáticamente los nuevos archivos JSON y los desplegará.

## Compatible con Vercel

Este sistema está diseñado para funcionar perfectamente en Vercel:

- Los archivos JSON se sirven como archivos estáticos desde `public/data/blog/`
- No requiere base de datos
- Funciona con SSR y generación estática
- Compatible con las funciones Edge de Vercel
- Sin dependencias de Nuxt Content en runtime

## Estructura de archivos

```
public/data/blog/
├── README.md                                      # Este archivo
├── index.json                                     # Lista de todos los artículos
├── mi-articulo.json                               # Artículo individual
└── otro-articulo.json                             # Otro artículo

pages/blog/
├── index.vue                                      # Página de listado
└── [slug].vue                                     # Página de detalle
```

## Notas importantes

1. **Orden de artículos**: Los artículos se ordenan por fecha descendente en el archivo `index.json`
2. **Imágenes**: Coloca las imágenes en `public/assets/images/blog/`
3. **HTML limpio**: Asegúrate de que el HTML esté bien formado (cierra todas las etiquetas)
4. **Caracteres especiales**: Escapa las comillas en el JSON usando `\"`
5. **Sin Markdown**: El sistema ya no usa Markdown, solo HTML directo