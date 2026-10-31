<?php

return [
    'default' => env('DB_CONNECTION', 'mysql'),
    'connections' => [
        'sqlite' => [
            'driver'   => 'sqlite',
            'url'      => env('DB_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix'   => '',
            'foreign_keys' => env('DB_FOREIGN_KEYS', true),
        ],
        'mysql' => [
            'driver'         => 'mysql',
            'url'            => env('DB_URL'),
            'host'           => env('DB_HOST', '127.0.0.1'),
            'port'           => env('DB_PORT', '3306'),
            'database'       => env('DB_DATABASE', 'gigar'),
            'username'       => env('DB_USERNAME', 'root'),
            'password'       => env('DB_PASSWORD', ''),
            'unix_socket'    => env('DB_SOCKET', ''),
            'charset'        => env('DB_CHARSET', 'utf8mb4'),
            'collation'      => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix'         => '',
            'prefix_indexes' => true,
            'strict'         => true,
            'engine'         => null,
            // ----- SSL options -----
            // Aiven (and most cloud MySQL providers) REQUIRE SSL. The
            // options below are read from .env so you can connect to
            // Aiven without editing this file — just set the env vars.
            //
            // To connect to Aiven, set in .env:
            //   DB_SSL_MODE=required        (or 'verify_ca' / 'verify_identity')
            //   MYSQL_ATTR_SSL_CA=/path/to/ca.pem  (downloaded from Aiven console)
            //
            // For local dev (XAMPP, no SSL), leave these unset — the
            // array_filter() strips them out and no SSL is attempted.
            'options'        => extension_loaded('pdo_mysql') ? array_filter([
                // Path to the CA certificate file. Aiven lets you download
                // this from the service Overview page → "CA Certificate".
                PDO::MYSQL_ATTR_SSL_CA   => env('MYSQL_ATTR_SSL_CA'),

                // SSL mode: 'preferred' (default), 'required', 'verify_ca',
                // or 'verify_identity'. Aiven needs at least 'required'.
                // 'verify_ca' also checks the CA cert; 'verify_identity'
                // also checks the hostname matches the cert.
                PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => env('DB_SSL_VERIFY_SERVER_CERT', false),

                // Optional client cert + key (only needed if your Aiven
                // service requires 2-way SSL — most setups don't).
                PDO::MYSQL_ATTR_SSL_CERT => env('MYSQL_ATTR_SSL_CERT'),
                PDO::MYSQL_ATTR_SSL_KEY  => env('MYSQL_ATTR_SSL_KEY'),
            ], fn ($v) => $v !== null && $v !== '' && $v !== false) : [],
        ],
    ],
    'migrations' => [
        'table'  => 'migrations',
        'update_date_on_publish' => true,
    ],
];
