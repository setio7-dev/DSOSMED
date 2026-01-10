<?php

use App\Http\Controllers\MedanPediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']); //all
Route::post('/register/admin', [UserController::class, 'registerAdmin']); //admin
Route::post('/login', [UserController::class, 'login']); //all

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::prefix('medanpedia')->group(function () {
    Route::get('/profile', [MedanPediaController::class, 'profile']);
    Route::get('/services', [MedanPediaController::class, 'services']);
    Route::post('/order', [MedanPediaController::class, 'order']);
    Route::get('/status/{orderId}', [MedanPediaController::class, 'status']);
    Route::post('/refill/{orderId}', [MedanPediaController::class, 'refill']);
    Route::get('/refill-status/{refillId}', [MedanPediaController::class, 'refillStatus']);
});

