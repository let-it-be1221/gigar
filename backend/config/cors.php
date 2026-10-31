<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'https://gigartrading.com',
        'https://www.gigartrading.com',
    ],

    // Allow all *.vercel.app + *.ngrok origins (for cloud deployment)
    'allowed_origins_patterns' => [
        '/^https:\/\/.*\.vercel\.app$/',
        '/^https:\/\/.*\.ngrok.*\.app$/',
        '/^https:\/\/.*\.ngrok-free\.app$/',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
