<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | SAST FIX (CWE-942): CORS is configured with SPECIFIC origins, not
    | wildcard patterns. The ngrok pattern is kept for local dev but
    | should be removed in production. Add your specific Vercel domain
    | to the allowed_origins array below.
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        // Local dev
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        // Production — replace with your ACTUAL Vercel domain
        // Example: 'https://gigar-frontend.vercel.app'
        'https://gigartrading.com',
        'https://www.gigartrading.com',
    ],

    // SAST FIX (CWE-942): Removed wildcard patterns for *.vercel.app and
    // *.ngrok.app — these allowed ANYONE to deploy a Vercel/ngrok project
    // and make authenticated requests to the API.
    // For local ngrok testing, add your specific ngrok URL to
    // allowed_origins above instead of using a wildcard.
    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
