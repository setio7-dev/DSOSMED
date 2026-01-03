<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']); //customer
Route::post('/register/admin', [UserController::class, 'registerAdmin']); //customer
Route::post('/login', [UserController::class, 'login']); //all