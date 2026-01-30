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
Route::get('/admin/pengguna', function () {
    return Inertia::render('admin/userManagement');
});

Route::get('/admin/layanan/nokos-ada-otp', function () {
    return Inertia::render('admin/serviceNokosAdaOtp');
});

Route::get('/admin/layanan/nokos-virtusim', function () {
    return Inertia::render('admin/serviceNokosVirtusim');
});

Route::get('/admin/layanan/suntik', function () {
    return Inertia::render('admin/serviceSuntik');
});

Route::get('/admin/layanan/pengaturan', function () {
    return Inertia::render('admin/serviceManagement');
});

// Customer
Route::get('/customer/profile', function () {
    return Inertia::render('customer/profile');
});

Route::get('/customer/nokos/order', function () {
    return Inertia::render('customer/nokosOrder');
});

Route::get('/customer/suntik/order', function () {
    return Inertia::render('customer/suntikOrder');
});

