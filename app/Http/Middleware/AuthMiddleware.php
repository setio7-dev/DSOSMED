<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = PersonalAccessToken::findToken($request->bearerToken());
        if (!$user) {
            return response()->json([
                "message" => "Pengguna belum masuk!",
            ], 401);
        }

        Auth::login($user->tokenable);
        return $next($request);
    }
}
