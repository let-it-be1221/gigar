<?php

use Laravel\Sanctum\Sanctum;

return [
    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    | Used only when Sanctum is in session-based SPA mode. Our app uses
    | token-based auth for the admin API, so this is informational.
    */
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:5173,127.0.0.1,127.0.0.1:5173,::1',
        env('APP_URL') ? ',' . parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    */
    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    */
    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    */
    'token_prefix' => 'gigar_',

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    | We use the framework's default middleware aliases (defined in
    | bootstrap/app.php) — no need to override here. The previous version
    | pointed at non-existent classes \App\Http\Middleware\VerifyCsrfToken
    | and \App\Http\Middleware\EncryptCookies which caused:
    |   "Target class [App\Http\Middleware\EncryptCookies] does not exist"
    */
];
