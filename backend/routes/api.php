<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarouselController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API routes (guest mode)
|--------------------------------------------------------------------------
*/
Route::get('/health', fn () => response()->json(['status' => 'ok', 'service' => 'Gigar API']));

Route::prefix('public')->group(function () {
    Route::get('/home', [PublicController::class, 'home']);              // combined home payload (1 call instead of 4)
    Route::get('/carousel', [CarouselController::class, 'publicIndex']); // homepage carousel slides
    Route::get('/posts', [PublicController::class, 'index']);          // list published posts (paginated)
    Route::get('/posts/slug/{slug}', [PublicController::class, 'show']);   // single post by slug
    Route::get('/posts/featured', [PublicController::class, 'featured']);  // featured posts for homepage
    Route::get('/stats', [PublicController::class, 'stats']);           // public stats (post count, etc.)
    Route::get('/services', [PublicController::class, 'services']);      // services list (with the 3 service lines)
    Route::get('/products', [PublicController::class, 'products']);       // product catalog

    // Customers
    Route::get('/customers', [CustomerController::class, 'publicIndex']);
    Route::get('/customers/featured', [CustomerController::class, 'featured']);
    Route::get('/customers/sectors', [CustomerController::class, 'sectors']);
    Route::get('/customers/stats', [CustomerController::class, 'stats']);
    Route::get('/customers/{slug}', [CustomerController::class, 'show']);

    Route::post('/contact', [PublicController::class, 'contact']);        // contact form submission
    Route::post('/newsletter', [PublicController::class, 'newsletter']);  // footer newsletter signup
});

/*
|--------------------------------------------------------------------------
| Admin authentication
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

/*
|--------------------------------------------------------------------------
| Admin-only API routes (admin mode)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Posts CRUD
    Route::get('/posts', [PostController::class, 'index']);         // all posts (incl. drafts)
    Route::get('/posts/{post}', [PostController::class, 'show']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::patch('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    Route::post('/posts/{post}/feature', [PostController::class, 'toggleFeature']);

    // Carousel slides CRUD
    Route::get('/carousel', [CarouselController::class, 'index']);
    Route::post('/carousel', [CarouselController::class, 'store']);
    Route::put('/carousel/{slide}', [CarouselController::class, 'update']);
    Route::delete('/carousel/{slide}', [CarouselController::class, 'destroy']);
    Route::post('/carousel/{slide}/toggle', [CarouselController::class, 'toggleActive']);

    // Customers CRUD
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::put('/customers/{customer}', [CustomerController::class, 'update']);
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy']);
    Route::post('/customers/{customer}/feature', [CustomerController::class, 'toggleFeatured']);

    // Media upload (image/video)
    Route::post('/media', [PostController::class, 'uploadMedia']);
    Route::delete('/media/{path?}', [PostController::class, 'deleteMedia'])
        ->where('path', '.*');

    // Dashboard
    Route::get('/dashboard', [PostController::class, 'dashboard']);
});


