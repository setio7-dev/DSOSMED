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

Route::get('/admin/layanan/nokos-jasa-otp', function () {
    return Inertia::render('admin/serviceNokosJasaOtp');
});

Route::get('/admin/layanan/nokos-virtusim', function () {
    return Inertia::render('admin/serviceNokosVirtusim');
});

Route::get('/admin/layanan/suntik-medanpedia', function () {
    return Inertia::render('admin/serviceSuntik');
});

Route::get('/admin/layanan/suntik-miraipedia', function () {
    return Inertia::render('admin/serviceSuntikMiraiPedia');
});

Route::get('/admin/layanan/pengaturan', function () {
    return Inertia::render('admin/serviceManagement');
});

Route::get('/admin/order-layanan', function () {
    return Inertia::render('admin/orderService');
});

Route::get('/admin/layanan/pengaturan', function () {
    return Inertia::render('admin/serviceManagement');
});

Route::get("/admin/edit-text", function() {
    return Inertia::render("admin/editText");
});

// Customer
Route::get('/customer/profile', function () {
    return Inertia::render('customer/profile');
});

Route::get('/customer/nokos/order', function () {
    return Inertia::render('customer/nokosOrder');
});

Route::get('/customer/nokos/otp', function () {
    return Inertia::render('customer/nokosOtp');
});

Route::get('/customer/nokos/history', function () {
    return Inertia::render('customer/historyNokos');
});

Route::get('/customer/nokos/guide', function () {
    return Inertia::render('customer/guideNokos');
});

Route::get('/customer/suntik/order', function () {
    return Inertia::render('customer/suntikOrder');
});

Route::get('/customer/suntik/history', function () {
    return Inertia::render('customer/historySuntik');
});

Route::get('/customer/suntik/guide', function () {
    return Inertia::render('customer/guideSuntik');
});

Route::get('/customer/deposit', function () {
    return Inertia::render('customer/deposit');
});

Route::get('/customer/deposit/history', function () {
    return Inertia::render('customer/historyDeposit');
});

Route::get('/customer/customer-service', function () {
    return Inertia::render('customer/customerService');
});

