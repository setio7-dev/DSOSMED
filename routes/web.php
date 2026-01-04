<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/auth', function () {
    return Inertia::render('auth/auth');
});

Route::get('/admin/home', function () {
    return Inertia::render('admin/home');
});
