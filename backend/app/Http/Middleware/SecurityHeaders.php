<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * SAST FIX (CWE-693): Add security headers to all responses.
 * - X-Frame-Options: DENY — prevents clickjacking
 * - X-Content-Type-Options: nosniff — prevents MIME sniffing
 * - Strict-Transport-Security — enforces HTTPS
 * - Referrer-Policy — limits referrer leakage
 * - Content-Security-Policy — restricts resource loading
 */
class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        // Allow images, styles, scripts from same origin + Unsplash + picsum + YouTube embeds
        $response->headers->set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; frame-src 'self' https://www.youtube.com; connect-src 'self'");

        return $response;
    }
}
