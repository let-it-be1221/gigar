#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Gigar Trading & Technical Center — local dev setup
# Stack: Laravel 11 (API) + React 18 (Vite) + MySQL 8
# ---------------------------------------------------------------------------
# Usage:  bash setup.sh
# Prereqs: PHP 8.2+, Composer, Node 18+, npm, MySQL 8+ (or MariaDB 10.6+)
# ---------------------------------------------------------------------------

set -e

echo "================================================"
echo "  GIGAR TRADING & TECHNICAL CENTER — DEV SETUP"
echo "================================================"

# 1. Backend -------------------------------------------------------------
echo ""
echo "[1/6] Installing Laravel dependencies (composer install)…"
cd backend
if [ ! -f .env ]; then
  cp .env.example .env
fi
composer install --no-interaction --prefer-dist

echo ""
echo "[2/6] Generating application key…"
php artisan key:generate --ansi || true

echo ""
echo "[3/6] Preparing MySQL database…"
read -p "MySQL DB name [gigar]: " DB_NAME
DB_NAME=${DB_NAME:-gigar}
read -p "MySQL user [root]: " DB_USER
DB_USER=${DB_USER:-root}
read -s -p "MySQL password: " DB_PASS
echo ""
# Inject into .env
sed -i.bak "s/DB_DATABASE=.*/DB_DATABASE=${DB_NAME}/" .env
sed -i.bak "s/DB_USERNAME=.*/DB_USERNAME=${DB_USER}/" .env
sed -i.bak "s/DB_PASSWORD=.*/DB_PASSWORD=${DB_PASS}/" .env
rm -f .env.bak

# Try to create the database if it doesn't exist
mysql -u"${DB_USER}" -p"${DB_PASS}" -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" || echo "  -> could not auto-create database, please create it manually: '${DB_NAME}'"

echo ""
echo "[4/6] Running migrations + seeders…"
php artisan migrate --seed --force

echo ""
echo "[5/6] Creating storage:public symlink…"
php artisan storage:link || true

cd ..

# 2. Frontend ------------------------------------------------------------
echo ""
echo "[6/6] Installing frontend dependencies (npm install)…"
cd frontend
cp -n .env.example .env 2>/dev/null || true
npm install

echo ""
echo "================================================"
echo "  SETUP COMPLETE — to run the site locally:"
echo "================================================"
echo "  # Terminal 1 — start the API"
echo "    cd backend && php artisan serve --host=0.0.0.0 --port=8000"
echo ""
echo "  # Terminal 2 — start the React frontend"
echo "    cd frontend && npm run dev"
echo ""
echo "  Then open http://localhost:5173 in your browser."
echo ""
echo "  Admin login (after seeding):"
echo "    URL:      http://localhost:5173/login"
echo "    Email:    admin@gigartrading.com"
echo "    Password: Gigar@2024!"
echo "================================================"
