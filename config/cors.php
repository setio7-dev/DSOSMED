<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Paths
    |--------------------------------------------------------------------------
    |
    | You can enable CORS for all your API routes by using a wildcard,
    | or specify the paths you want to allow cross-origin requests for.
    |
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    |
    | Specify which HTTP methods are allowed for cross-origin requests.
    | Use ['*'] to allow all methods.
    |
    */
    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Specify the origins that are allowed to make requests. For development,
    | you can use ['*'] to allow all origins (including IPs on your LAN).
    | For production, it's recommended to use only your frontend domain.
    |
    */
    'allowed_origins' => ['*'], // dev mode
    // 'allowed_origins' => ['http://192.168.0.20:3000'], // production safer

    /*
    |--------------------------------------------------------------------------
    | Allowed Origin Patterns
    |--------------------------------------------------------------------------
    |
    | You can use patterns for more flexible origin matching.
    |
    */
    'allowed_origins_patterns' => [],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    |
    | Specify which HTTP headers are allowed in cross-origin requests.
    | Use ['*'] to allow all headers.
    |
    */
    'allowed_headers' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | These headers are accessible to the client in the browser.
    |
    */
    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | How long (in seconds) the results of a preflight request can be cached.
    |
    */
    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Whether the response to the request can be exposed when credentials
    | are included (cookies, authorization headers, TLS client certificates).
    |
    */
    'supports_credentials' => true,
];
