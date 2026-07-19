# Universidad Privada — deploy en Vercel

App Vite + React que persiste progreso en Supabase y usa una serverless function
para el tutor de Anthropic. Contenido de las 76 lecciones incluido en el bundle.

## Estructura

```
web/
├── api/tutor.js          serverless function del tutor (key en el server)
├── src/
│   ├── App.jsx           gate de login -> StudyApp
│   ├── Auth.jsx          login / registro (Supabase Auth)
│   ├── LessonApp.jsx     la app (prototipo verificado + persistencia)
│   ├── db.js             mapea lecciones y guarda progreso/repaso/eventos
│   ├── supabaseClient.js cliente Supabase
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
├── .env.example
└── .gitignore
```

## 1. Probar local

```bash
cd web
cp .env.example .env      # ya trae URL y anon key; agregá ANTHROPIC_API_KEY si querés probar el tutor
npm install
npm run dev
```

El tutor NO funciona con `npm run dev` puro (la function /api corre en Vercel).
Para probar el tutor local: `npm i -g vercel` y `vercel dev`.

## 2. Subir a GitHub y conectar a Vercel

1. Creá un repo y subí la carpeta `web/` (o el proyecto entero con `web/` adentro;
   si es lo segundo, en Vercel poné **Root Directory = web**).
2. En Vercel → New Project → importá el repo.
3. Framework: **Vite** (autodetectado). Build: `npm run build`. Output: `dist`.

## 3. Variables de entorno en Vercel

Settings → Environment Variables (Production y Preview):

| Variable | Valor |
|---|---|
| `VITE_SUPABASE_URL` | `https://hsndvpaaxpwpffarrofv.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_9O_8zdbFianCzj1oZSQAvg_-8REBM_7` |
| `ANTHROPIC_API_KEY` | tu clave de Anthropic (empieza con `sk-ant-...`) |
| `ANTHROPIC_MODEL` (opcional) | ej. `claude-sonnet-4-5` |

Las `VITE_*` se exponen en el navegador (es correcto: RLS protege los datos).
`ANTHROPIC_API_KEY` queda solo en el server.

## 4. Configurar Supabase Auth (una vez)

Dashboard del proyecto `universidad_privada`:

- **Authentication → Providers → Email**: activado.
- **Authentication → URL Configuration**: agregá la URL de Vercel
  (ej. `https://tu-app.vercel.app`) en *Site URL* y *Redirect URLs*.
- Para probar rápido sin confirmar mails: **Authentication → Providers → Email →
  "Confirm email"** desactivado (reactivalo para producción).
- Recomendado: **Authentication → Passwords → Leaked password protection** = ON.

## 5. Deploy

Push a la rama principal → Vercel buildea y publica. Registrás un usuario desde la
pantalla de login y el progreso empieza a guardarse.

---

## Estado de la base (ya hecho)

- Esquema, RLS y políticas: OK.
- 76 lecciones cargadas (PRG1 17, MDIS 25, ALG 17, PRG2 17) — filas necesarias
  para las FK de progreso.
- Restricciones únicas `(user_id, lesson_id)` en `lesson_progress` y `review_items`
  (para los upsert idempotentes).

## Opcional: contenido completo en la base

Hoy el contenido (teoría/quiz/ejercicio) vive en el bundle de la app y la tabla
`lessons` solo guarda code/title/orden. Si algún día querés que la base sea la
fuente de verdad del contenido, corré `db/seed-lessons.sql` en el SQL Editor de
Supabase (es idempotente: rellena theory/example/quiz/exercise de las 76 lecciones).
