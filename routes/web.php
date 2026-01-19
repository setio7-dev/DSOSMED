<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/auth', function () {
    return Inertia::render('auth/auth');
});

// Admin
Route::get('/admin/home', function () {
    return Inertia::render('admin/home');
});

Route::get('/admin/pengguna', function () {
    return Inertia::render('admin/userManagement');
});

Route::get('/admin/layanan/nokos-ada-otp', function () {
    return Inertia::render('admin/serviceNokosAdaOtp');
});

// Customer
Route::get('/home', function () {
    return Inertia::render('customer/home');
});

