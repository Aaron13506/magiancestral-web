# Portada editable — estado del trabajo

Rama: `feat/portada-editable` · Última actualización: 2026-09-15

Hacer que las fotos del hero de la página de inicio se editen desde el panel,
con listas separadas para computadora y teléfono (hasta 6 cada una, las de
teléfono opcionales) y vista previa de ambos recortes.

---

## 1. Qué está hecho

### Datos

- **Tabla nueva `site_settings`** (`server/db/schema.ts`): pares clave → JSON.
  La primera clave es `hero`. Migración en
  `server/db/migrations/0001_cold_site_settings.sql` (+ snapshot y journal de
  drizzle ya escritos a mano; `pnpm db:generate` no hace falta).
- **`utils/heroSlides.ts`** — el contrato compartido entre servidor, sitio y
  panel: forma de los datos, tope de 6 fotos, corte en 768 px, fotos de
  fábrica, normalización, herencia móvil → escritorio y el helper que decide
  por qué eje recorta cada foto.

Cada foto guarda `{ image, focusX, focusY }`; el foco se traduce a
`background-position` y es lo que evita que el recorte se coma las caras.

### API

| Endpoint | Qué hace |
|---|---|
| `GET /api/settings/hero` | Público. **Nunca falla**: si no hay tabla o no hay fila, devuelve las fotos de fábrica. |
| `GET /api/admin/settings/hero` | Igual pero sin red de seguridad (el panel debe enterarse si la BD falla). |
| `PUT /api/admin/settings/hero` | Valida con zod (`server/utils/validation/settings.ts`) y guarda. |

Helpers de lectura/escritura en `server/utils/siteSettings.ts`.

### Sitio público — `components/SliderFour.vue`

Se imprimen **las dos pistas** (escritorio y teléfono) y el CSS decide cuál se
ve en `max-width: 768px`. Así el encuadre correcto ya viene en el HTML servido
(sin salto al hidratar) y el navegador no descarga las fotos de la pista
oculta. Sin fotos de teléfono, solo se imprime la de escritorio y sirve para
todo. Toda la tipografía y los degradados del hero original se conservan.

### Panel — `/admin/portada` (nuevo ítem "Portada" en el menú lateral)

- Dos bloques de fotos (computadora / teléfono) con subida, biblioteca, pegar
  URL, reordenar, quitar y dos deslizadores de encuadre por foto.
- Botón para copiar las fotos de computadora al teléfono y reencuadrarlas.
- **Vista previa** pegajosa con conmutador Computadora / Teléfono, marco
  16:9 y marco de teléfono, degradado y rótulo a escala, navegable foto a foto.
- Aviso de cambios sin guardar y guardado con toast.

Componentes: `components/Admin/AdminHeroSlides.vue` (editor de una lista) y
`components/Admin/AdminHeroPreview.vue` (la previa).

### Fotos nuevas

Los HEIC de `new/` (que **no** están en git) se convirtieron a JPEG con el
decodificador de Windows (`System.Windows.Media.Imaging`, sin instalar nada):

- `public/assets/images/main-slider/portada-horizontal-1..5.jpg` — 2400×1800.
- `public/assets/images/main-slider/portada-vertical-1..2.jpg` — 1650×2200.

`IMG_7651 (1).HEIC` era duplicado exacto de `IMG_7651.HEIC` y se descartó.

---

## 2. Lo que encontró la prueba end-to-end (y ya está corregido)

1. **El móvil perdía sus encuadres afinados.** Sin fila guardada, el endpoint
   devolvía solo la lista de escritorio. Ahora las fotos de fábrica incluyen
   las dos listas.
2. **Previa ilegible**: el subtítulo salía a 5 px. Columna más ancha y mínimo
   legible para el rótulo.
3. **La previa engañaba**: no mostraba que la cabecera del sitio tapa la parte
   de arriba del hero (medido: 264 px sobre una ventana de 2048 px = 12,9 %;
   139 px sobre 414 px = 33,6 % en teléfono). Ahora se dibuja la franja
   "zona del menú".
4. **Deslizador que no movía nada**: una foto 4:3 en un hueco panorámico solo
   se recorta por arriba y por abajo. Ahora cada fila dice por qué eje se
   recorta y apaga el deslizador inerte.
5. **Carrusel clavado con exactamente 2 fotos**: Swiper avisa "no hay
   suficientes slides para el modo loop" y deja de girar. Se usa `rewind`
   cuando la lista tiene 2 y `loop` a partir de 3.

---

## 3. PENDIENTE — lo único sin terminar

**La pista oculta no se recalcula al cruzar el corte de 768 px con la página
ya cargada** (estrechar la ventana, rotar una tableta). Swiper inicializa la
pista que nace dentro de un `display: none` con 0 slides y ancho 0, y no se
recupera sola: el carrusel del teléfono aparece parado.

- Comprobado que **`swiper.update()` lo arregla al instante** (pasa a 2 slides
  y 385 px de ancho).
- En `components/SliderFour.vue` ya está puesto el arreglo vía
  `matchMedia(...).addEventListener('change', refrescarSwipers)` con
  `@swiper` registrando las instancias — **pero sin verificar**.
- No se pudo probar: redimensionar un iframe desde la página padre no dispara
  `resize` ni `matchMedia` dentro, y la pestaña del navegador estaba en la
  ventana del usuario (no se redimensionó a propósito).

**Siguiente paso previsto:** añadir además un listener de `window.resize`
(con rAF para no abusar) que llame a `refrescarSwipers()` solo si la pista
está visible y tiene 0 slides o un ancho distinto. Con eso el arreglo deja de
depender de que `matchMedia` dispare, y se puede probar despachando un evento
`resize` real. Verificarlo estrechando una ventana de verdad por debajo de
768 px.

---

## 4. Para desplegar

1. `pnpm db:migrate` contra Supabase (crea `site_settings`, no toca nada más).
   **Ojo:** no se pudo correr desde aquí porque el sandbox bloquea el puerto
   de la base de datos; la producción sigue sin la tabla.
2. Mientras no se migre, la portada funciona con las fotos de fábrica
   (probado: la API devuelve 200 y el sitio se pinta igual).
3. La home usa ISR de 5 minutos, así que las ediciones del panel tardan hasta
   ese rato en verse publicadas.

---

## 5. Cómo levantar el entorno de prueba local

La base de datos remota no es accesible desde el sandbox, así que las pruebas
van contra un Postgres local desechable:

```bash
# 1. Postgres local en un puerto aparte
pg_ctl -D "C:/Users/Aaron/scoop/persist/postgresql/data" \
       -o "-p 5433 -c listen_addresses=127.0.0.1" -l /tmp/pg.log start
psql -h 127.0.0.1 -p 5433 -U postgres -d postgres \
     -c "CREATE DATABASE magiancestral_e2e;"

# 2. Migraciones
DATABASE_URL="postgres://postgres@127.0.0.1:5433/magiancestral_e2e" pnpm db:migrate

# 3. Servidor con credenciales de prueba (no toca el .env)
NUXT_DATABASE_URL="postgres://postgres@127.0.0.1:5433/magiancestral_e2e" \
NUXT_ADMIN_USERNAME="e2e" \
NUXT_ADMIN_PASSWORD_HASH='<hash bcrypt de la contraseña que elijas>' \
NUXT_JWT_SECRET="cualquier-cosa-local" \
pnpm dev
```

El hash se genera con
`node -e "console.log(require('bcryptjs').hashSync('tu-clave',10))"`.

Para ver la versión de teléfono sin redimensionar la ventana, sirve meter la
home en un iframe de 414 px desde la consola: aplica las media queries igual
que un móvil (pero **no** dispara eventos de `resize`, ver punto 3).

---

## 6. Archivos tocados

```
utils/heroSlides.ts                             nuevo
server/db/schema.ts                             + tabla site_settings
server/db/migrations/0001_cold_site_settings.sql  nuevo (+ snapshot y journal)
server/utils/siteSettings.ts                    nuevo
server/utils/validation/settings.ts             nuevo
server/api/settings/hero.get.ts                 nuevo (público)
server/api/admin/settings/hero.get.ts           nuevo
server/api/admin/settings/hero.put.ts           nuevo
components/SliderFour.vue                       reescrito (hero por datos)
components/Admin/AdminHeroSlides.vue            nuevo
components/Admin/AdminHeroPreview.vue           nuevo
pages/admin/portada.vue                         nuevo
layouts/admin.vue                               + ítem "Portada" en el menú
public/assets/images/main-slider/portada-*.jpg  7 fotos convertidas
```
