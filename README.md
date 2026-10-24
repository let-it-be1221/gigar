# Gigar Trading & Technical Center — Official Website

A modern, animated, full-stack web application for **Gigar Trading & Technical Center**
(Ethiopia's trusted supplier of garage equipment, car lifts, elevators, escalators, paint booths,
GPS speed-limit devices, air conditioners and heavy machinery since 1985 E.C.).

Built with **React + Vite + Tailwind CSS + Framer Motion** on the frontend and **Laravel 11 + MySQL** on the backend, with a complete **admin mode / guest mode** split — visitors can browse and read; only authenticated admins can create, edit, feature or delete blog posts.

> Reference UI / brand inspiration: https://gigartrading.com

---

## ✨ Features

### Guest mode (public)
- Animated, brand-colored **hero** with floating accent shapes and stats
- **Home page** with services grid, brand marquee, "Why us" panel, project process, featured blog, stats banner and CTA
- **About page** with company story, vision / mission / values and a four-decade timeline
- **Services page** with the full product catalog
- **Blog listing** with search, category filter and pagination
- **Blog post detail** with cover image / YouTube embed / video player, related posts and share
- **Contact page** with validated form that POSTs to the API
- Sticky **animated navbar** with scroll-aware styling, mobile drawer and admin login
- Polished **footer** with contact info, social links and newsletter signup
- Reading-progress bar, page transitions, scroll-reveal animations throughout

### Admin mode (protected)
- **Sanctum-token login** with strict `admin` middleware on every admin route
- **Dashboard** with stat cards, recent posts and quick actions
- **Post list** with search, status filter, inline "feature" toggle and delete confirm modal
- **Post editor** with:
  - Drag-and-drop / click-to-upload media (image *or* video)
  - YouTube embed support (just paste the embed URL)
  - Live preview modal
  - Tag chips, category, status, publish date, "feature on homepage" toggle
  - Draft / Publish / Archive workflow

### Backend
- Laravel 11 + Sanctum + MySQL 8
- REST API: `/api/public/*` (guest) and `/api/admin/*` (admin-only)
- Migrations + seeders ship with **8 sample blog posts** (mix of image, video and YouTube embeds)
- CORS configured for `localhost:5173`, `localhost:3000` and the production domains
- Contact-form endpoint stores submissions in the log and emails the team

---

## 🛠 Tech Stack

| Layer       | Stack |
|-------------|-------|
| Frontend    | React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · React Router 6 · lucide-react · react-hot-toast |
| Backend     | Laravel 11 · PHP 8.2 · Sanctum (token auth) |
| Database    | MySQL 8 (or MariaDB 10.6+) |
| Media       | Local filesystem (`storage/app/public`) with `php artisan storage:link` |

---

## 🚀 Quick Start

### Prerequisites
- PHP **8.2+** with `pdo_mysql`, `mbstring`, `xml`, `curl`, `zip` extensions
- **Composer** 2+
- **Node.js** 18+ and **npm** 9+
- **MySQL 8** or **MariaDB 10.6+**

### One-command setup
```bash
git clone https://github.com/let-it-be1221/gigar.git
cd gigar
bash setup.sh
```
The setup script will:
1. Run `composer install` in `backend/`
2. Copy `.env.example` to `.env` and generate an app key
3. Ask for MySQL credentials and update `.env`
4. Run `php artisan migrate --seed` (creates the schema + inserts the admin user and 8 sample posts)
5. Create the `storage:public` symlink for media uploads
6. Run `npm install` in `frontend/`

### Manual setup (if you prefer)
```bash
# 1. Backend
cd backend
cp .env.example .env
composer install
php artisan key:generate
# edit .env with your DB credentials
php artisan migrate --seed
php artisan storage:link

# 2. Frontend
cd ../frontend
cp .env.example .env
npm install
```

### Running the dev servers
Open two terminals:

```bash
# Terminal 1 — API
cd backend && php artisan serve --host=0.0.0.0 --port=8000

# Terminal 2 — React frontend
cd frontend && npm run dev
```
Then open **http://localhost:5173** 🎉

---

## 🔐 Admin Access (default seeded credentials)

| Field    | Value                    |
|----------|--------------------------|
| URL      | http://localhost:5173/login |
| Email    | `admin@gigartrading.com` |
| Password | `Gigar@2024!`            |

> Change these by editing the `ADMIN_*` variables in `backend/.env` and re-running `php artisan db:seed --class=AdminUserSeeder`.

---

## 📁 Project Structure

```
gigar/
├── backend/                          # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/       # Auth, Post, Public controllers
│   │   │   ├── Middleware/IsAdmin.php
│   │   │   └── Requests/             # StorePostRequest, UpdatePostRequest
│   │   └── Models/                   # User, Post
│   ├── database/
│   │   ├── migrations/               # users, posts
│   │   └── seeders/                  # AdminUserSeeder + PostSeeder (8 sample posts)
│   ├── routes/api.php                # public + admin routes
│   ├── config/                       # app, auth, cors, database, filesystems, sanctum
│   └── .env.example
│
├── frontend/                         # React 18 + Vite
│   ├── public/
│   │   ├── logo.png                  # Gigar brand logo
│   │   └── uploads/
│   ├── src/
│   │   ├── api/client.js             # Axios + token interceptor + admin/public endpoints
│   │   ├── context/AuthContext.jsx   # Auth provider, login/logout, isAdmin flag
│   │   ├── components/
│   │   │   ├── Navbar.jsx, Footer.jsx, Layout.jsx
│   │   │   ├── Hero.jsx, ServiceCard.jsx, BlogCard.jsx
│   │   │   ├── AnimatedSection.jsx, Loader.jsx, ProtectedRoute.jsx
│   │   │   └── AdminShell.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx, About.jsx, Services.jsx
│   │   │   ├── Blog.jsx, BlogPost.jsx, Contact.jsx, Login.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── PostList.jsx
│   │   │       └── PostEditor.jsx
│   │   ├── utils/format.js
│   │   ├── App.jsx                   # Routes
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Tailwind + custom classes
│   ├── tailwind.config.js
│   ├── vite.config.js                # proxies /api -> :8000
│   └── package.json
│
├── setup.sh                          # one-command installer
├── .gitignore
└── README.md
```

---

## 📡 API Endpoints

### Public (`/api/public/*`)
| Method | Path                        | Description |
|--------|-----------------------------|-------------|
| GET    | `/public/posts`             | Paginated published posts (supports `?page`, `?q`, `?category`, `?per_page`) |
| GET    | `/public/posts/featured`    | Up to 6 featured posts for the homepage |
| GET    | `/public/posts/slug/{slug}` | Single post by slug + 3 related posts |
| GET    | `/public/stats`             | Post counts + available categories |
| GET    | `/public/services`          | Full services catalog |
| POST   | `/public/contact`           | Contact form submission (logs + emails) |

### Auth (`/api/auth/*`)
| Method | Path       | Description |
|--------|------------|-------------|
| POST   | `/auth/login`  | Admin login — returns Sanctum token |
| POST   | `/auth/logout` | Invalidate current token |
| GET    | `/auth/me`     | Current admin user |

### Admin (`/api/admin/*` — requires Bearer token + `admin` role)
| Method | Path                          | Description |
|--------|-------------------------------|-------------|
| GET    | `/admin/posts`                | All posts (incl. drafts) — paginated |
| GET    | `/admin/posts/{id}`           | Single post |
| POST   | `/admin/posts`                | Create post |
| PUT    | `/admin/posts/{id}`           | Update post |
| DELETE | `/admin/posts/{id}`           | Delete post |
| POST   | `/admin/posts/{id}/feature`   | Toggle featured |
| POST   | `/admin/media`                | Upload image/video (multipart/form-data) |
| DELETE | `/admin/media/{path}`         | Delete uploaded media |
| GET    | `/admin/dashboard`            | Dashboard stats + recent posts |

---

## 🎨 Brand Identity

| Token | Color     | Usage |
|-------|-----------|-------|
| `gigar.red`   | `#c8102e` | Primary accents, CTAs, headlines |
| `gigar.redDark` | `#8b0a1f` | Hover states |
| `gigar.navy`  | `#1f2d4a` | Body text, dark sections |
| `gigar.navyDark` | `#141d33` | Hero overlays |
| `gigar.gold`  | `#f1b524` | Highlight accents, "Featured" badges |
| `gigar.cream` | `#fff7ed` | Light section backgrounds |
| `gigar.mist`  | `#f4f6fb` | Section backgrounds, blog listing |

Typography: **Plus Jakarta Sans** (display) + **Inter** (body).

---

## 🧪 Running Tests / Seeders

```bash
# Re-seed the database (deletes & re-inserts sample posts)
cd backend && php artisan migrate:fresh --seed

# Run only the post seeder
php artisan db:seed --class=PostSeeder
```

---

## 🚢 Deployment Notes (production)

1. **Frontend**: `cd frontend && npm run build` → deploy `dist/` to any static host (Vercel / Netlify / Nginx). Set `VITE_API_BASE_URL` to your production API.
2. **Backend**: deploy to a PHP host (Forge / Vapor / a VPS). Point web root at `backend/public/`. Run `composer install --no-dev -o`, `php artisan migrate --force`, `php artisan storage:link`, `php artisan config:cache`.
3. **Database**: provision a MySQL 8 instance, run migrations.
4. **Environment**: in `backend/.env` set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, `DB_*`, `SANCTUM_STATEFUL_DOMAINS`, `CORS_ALLOWED_ORIGINS`.
5. **Media**: in production, swap the `public` disk for S3 by editing `config/filesystems.php` if you need a CDN.

---

## 📜 License

MIT — © Gigar Trading & Technical Center.
