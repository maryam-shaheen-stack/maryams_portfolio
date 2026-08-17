# Maryam Portfolio — Backend

Express + MongoDB API. Public GET routes are read-only for everyone.
Admin login now exists; CRUD write routes and file uploads land next.

## Setup

1. Create a free MongoDB Atlas cluster: https://www.mongodb.com/atlas
2. `cd backend`
3. `cp .env.example .env` and fill in `MONGODB_URI` with your Atlas
   connection string (and `FRONTEND_ORIGIN` if not using the default Vite
   port).
4. Fill in `JWT_SECRET` (any long random string — `openssl rand -hex 32`
   works), and `ADMIN_EMAIL` / `ADMIN_PASSWORD` (your admin login).
5. Create a free Cloudinary account at https://cloudinary.com and fill
   in `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
   `CLOUDINARY_API_SECRET` from your dashboard (needed for image/CV
   uploads — everything else works fine without this step).
6. `npm install`
7. `npm run seed` — loads your real content from
   `../frontend/src/data/*.js` into MongoDB. Safe to re-run any time
   (upserts by slug, won't duplicate).
8. `npm run seed:admin` — creates your admin account from `ADMIN_EMAIL`
   / `ADMIN_PASSWORD` in `.env`. Re-run any time after changing
   `ADMIN_PASSWORD` to reset it.
9. `npm run dev` — starts the API on `http://localhost:5000` with
   auto-reload (`npm start` for a plain run without reload).

## Admin login

```
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"yourpassword"}'
```

Returns `{ token, admin }`. Send that token as
`Authorization: Bearer <token>` on every write request below.

## Write routes (admin-only)

Every list resource (projects, skills, skills-stack, experience,
leadership, education, achievements, journey, research, certifications,
services) now supports, in addition to its public `GET` routes:

| Method | Route | Body |
|---|---|---|
| `POST` | `/api/<resource>` | new document fields |
| `PUT` | `/api/<resource>/:slug` | fields to update |
| `DELETE` | `/api/<resource>/:slug` | — |
| `PATCH` | `/api/<resource>/reorder` | `{ "order": [{ "slug": "...", "order": 0 }, ...] }` |

(`skills-stack` uses `:id` instead of `:slug`, and its reorder body uses
`id` instead of `slug` — it has no slug field.)

`personal` and `social` are singletons — no create/delete, just:

| Method | Route | Body |
|---|---|---|
| `PUT` | `/api/personal` | any subset of `name`, `firstName`, `lastName`, `hero`, `about`, `contact`, `footer` |
| `PUT` | `/api/social` | any subset of `github`, `linkedin`, `email` |

Example — create a project:

```
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"slug":"new-project","title":"New Project","shortDescription":"..."}'
```

`image`/`cv` fields still just take a plain URL string for now — actual
file upload (Cloudinary) is next.

## File uploads (admin-only)

Send `multipart/form-data`, not JSON, for these:

| Method | Route | Form field | Notes |
|---|---|---|---|
| `POST` | `/api/projects/:slug/image` | `image` | JPEG/PNG/WEBP/GIF, max 5MB |
| `POST` | `/api/certifications/:slug/image` | `image` | JPEG/PNG/WEBP/GIF, max 5MB |
| `POST` | `/api/personal/photo` | `photo` | Hero profile photo, same limits |
| `POST` | `/api/personal/cv` | `cv` | PDF only, max 10MB |
| `DELETE` | `/api/personal/cv` | — | Removes the CV without replacing it |

All of these replace the previous file — the old Cloudinary asset is
deleted automatically once the new one is confirmed uploaded.

Example — upload a project image:

```
curl -X POST http://localhost:5000/api/projects/my-project/image \
  -H "Authorization: Bearer <token>" \
  -F "image=@/path/to/photo.jpg"
```

## Verify it's working

```
curl http://localhost:5000/health
curl http://localhost:5000/api
curl http://localhost:5000/api/personal
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/projects?featured=true
curl http://localhost:5000/api/skills
```

## Endpoints (all GET, public, read-only for now)

| Route                    | Returns                                   |
|---------------------------|-------------------------------------------|
| `/api/personal`           | hero/about/contact/footer copy (singleton)|
| `/api/social`              | github/linkedin/email (singleton)         |
| `/api/cv`                  | CV metadata (empty until Part 3 upload)   |
| `/api/cv/download`         | redirects to the CV PDF (404 until uploaded)|
| `/api/projects`            | all projects, sorted by `order`; `?featured=true` to filter |
| `/api/projects/:slug`      | one project                               |
| `/api/skills`              | skill categories                          |
| `/api/skills-stack`        | scroll-driven skills list                 |
| `/api/experience`          | work experience                           |
| `/api/leadership`          | leadership roles                          |
| `/api/education`           | education entries                         |
| `/api/achievements`        | achievements                              |
| `/api/journey`             | journey timeline                          |
| `/api/research`            | research/publications                     |
| `/api/certifications`      | certifications                            |
| `/api/services`            | freelance/collaboration services          |

Every list resource also supports `GET /api/<resource>/:slug` for a
single item.

## Notes

- `npm run seed` reads directly from `frontend/src/data/*.js` — this is a
  **local convenience only**, the running server never touches the
  frontend folder. If you ever move `backend/` out of this repo, update
  or remove the seed script's import paths.
- No auth on write routes yet because there ARE no write routes yet —
  that's Part 3.
- Testing note: this environment's network sandbox couldn't reach
  MongoDB's binary CDN to spin up an in-memory test database, so this
  was verified via syntax checks on every file, a check that all seed
  import paths resolve correctly, and confirming the server fails
  gracefully (clear error message, no hang) both with a missing and an
  unreachable `MONGODB_URI`. Once you add your real Atlas URI, run
  through the "Verify it's working" curl commands above to confirm live
  data end-to-end.
