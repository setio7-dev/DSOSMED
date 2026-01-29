<?php

use App\Http\Controllers\NokosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']); //all
Route::post('/register/admin', [UserController::class, 'registerAdmin']); //admin
Route::post('/login', [UserController::class, 'login']); //all

Route::post('/transaction/nokos', [NokosController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/transaction/nokos/user', [NokosController::class, 'indexByUser']);
    Route::post('/transaction/nokos/create', [NokosController::class, 'store']);
});
