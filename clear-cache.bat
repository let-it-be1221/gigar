@echo off
REM ---------------------------------------------------------------------------
REM Gigar Trading — post-pull cache clear (Windows)
REM Run this after `git pull` so the backend picks up new routes/migrations
REM without serving stale cached config.
REM ---------------------------------------------------------------------------
setlocal
cd /d "%~dp0backend"

echo.
echo [1/4] Clearing config cache...
php artisan config:clear
if errorlevel 1 goto :nophp

echo.
echo [2/4] Clearing route cache...
php artisan route:clear

echo.
echo [3/4] Clearing application cache (public.home, public.stats, etc.)...
php artisan cache:clear

echo.
echo [4/4] Re-running any pending migrations...
php artisan migrate --force

echo.
echo Done. Backend caches cleared. Start the servers with:
echo   cd backend ^&^& php artisan serve
echo   cd frontend ^&^& npm run dev
echo.
exit /b 0

:nophp
echo.
echo ERROR: 'php' is not on your PATH. Open the XAMPP shell or add
echo        C:\xampp\php to your PATH and re-run this script.
exit /b 1
