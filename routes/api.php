<?php

use App\Http\Controllers\DepositController;
use App\Http\Controllers\NokosController;
use App\Http\Controllers\ServiceAdaOtpController;
use App\Http\Controllers\ServiceAPIController;
use App\Http\Controllers\ServiceSuntikController;
use App\Http\Controllers\ServiceVirtusimController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']); //all
Route::post('/register/admin', [UserController::class, 'registerAdmin']); //admin
Route::post('/login', [UserController::class, 'login']); //all

Route::get("/virtusim/list-countries", [ServiceAPIController::class, "virtusim_api_listcountry"]);
Route::get("/virtusim/service/{country}", [ServiceAPIController::class, "virtusim_api_listservice"]);

Route::get("/adaotp/services", [ServiceAPIController::class, "adaotp_api_listservice"]);
Route::get("/adaotp/services/{id}", [ServiceAPIController::class, "adaotp_api_listcountry"]);
Route::post("/adaotp/order", [ServiceAPIController::class, "adaotp_api_order"])->middleware("auth");
Route::get("/adaotp/orders/status", [ServiceAPIController::class, "ada_otp_getorders"]);

Route::get("/medanpedia/services", [ServiceAPIController::class, "medanpedia_api_services"]);
Route::get("/medanpedia/profile", [ServiceAPIController::class, "medanpedia_api_profile"]);

Route::post("/iskapay/payments", [ServiceAPIController::class, "iskapay_create_payment"]);
Route::get("/iskapay/payments/{merchant_order_id}", [ServiceAPIController::class, "iskapay_payment_status"]);
Route::post("/iskapay/payments/{merchant_order_id}/cancel", [ServiceAPIController::class, "iskapay_cancel_payment"]);

Route::get('/history', [DepositController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::put('/update/saldo', [UserController::class, 'updateSaldo']);
    Route::get('/history/user', [DepositController::class, 'indexByUser']);
    Route::post('/history/user/create', [DepositController::class, 'store']);
    Route::delete('/history/user/delete/{id}', [DepositController::class, 'destroy']);

    Route::middleware("role:1")->prefix("/admin")->group(function () {
        Route::get("/users", [UserController::class, "index"]);
        Route::put("/users/{id}", [UserController::class, "update"]);

        Route::resource('/service/adaotp', ServiceAdaOtpController::class);
        Route::resource('/service/virtusim', ServiceVirtusimController::class);
        Route::resource('/service/medanpedia', ServiceSuntikController::class);
    });

    Route::prefix("/customer")->group(function () {
        Route::get("/service/adaotp", [ServiceAdaOtpController::class, "index"]);
        Route::get("/service/virtusim", [ServiceVirtusimController::class, "index"]);
        Route::get("/service/medanpedia", [ServiceSuntikController::class, "index"]);

        Route::resource("/transaction", TransactionController::class);
    });
});




