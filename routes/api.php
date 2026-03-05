<?php

use App\Http\Controllers\CustomerServiceController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ServiceAPIController;
use App\Http\Controllers\ServiceNokosController;
use App\Http\Controllers\ServiceSuntikController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']); //all
Route::post('/register/admin', [UserController::class, 'registerAdmin']); //admin
Route::post('/login', [UserController::class, 'login']); //all

Route::get("/virtusim/list-countries", [ServiceAPIController::class, "virtusim_api_listcountry"]);
Route::get("/virtusim/service/{country}", [ServiceAPIController::class, "virtusim_api_listservice"]);
Route::post("/virtusim/order", [ServiceAPIController::class, "virtusim_api_order"])->middleware("auth");

Route::get("/adaotp/services", [ServiceAPIController::class, "adaotp_api_listservice"]);
Route::get("/adaotp/services/{id}", [ServiceAPIController::class, "adaotp_api_listcountry"]);
Route::get("/adaotp/orders/status", [ServiceAPIController::class, "ada_otp_getorders"])->middleware("auth");
Route::post("/adaotp/order", [ServiceAPIController::class, "adaotp_api_order"])->middleware("auth");
Route::post("/adaotp/orders/cancel", [ServiceAPIController::class, "adaotp_cancel_order"])->middleware("auth");
Route::post("/adaotp/orders/finish/{order_id}", [ServiceAPIController::class, "adaotp_finish_order"]);

Route::get("/medanpedia/services", [ServiceAPIController::class, "medanpedia_api_services"]);
Route::get("/medanpedia/profile", [ServiceAPIController::class, "medanpedia_api_profile"]);
Route::post("/medanpedia/order", [ServiceAPIController::class, "medanpedia_api_order"])->middleware("auth");
Route::post("/medanpedia/status", [ServiceAPIController::class, "medanpedia_api_status"])->middleware("auth");
Route::post("/medanpedia/refill", [ServiceAPIController::class, "medanpedia_api_refill"])->middleware("auth");
Route::post("/medanpedia/refill/status", [ServiceAPIController::class, "medanpedia_api_refill_status"])->middleware("auth");

Route::get("/jasaotp/country", [ServiceAPIController::class, "jasaotp_country"]);
Route::get("/jasaotp/operator", [ServiceAPIController::class, "jasaotp_operator"]);
Route::get("/jasaotp/service", [ServiceAPIController::class, "jasaotp_service"]);
Route::post("/jasaotp/order", [ServiceAPIController::class, "jasaotp_order"])->middleware("auth");
Route::post("/jasaotp/orders/status", [ServiceAPIController::class, "jasaotp_order_status"])->middleware("auth");
Route::post("/jasaotp/orders/cancel", [ServiceAPIController::class, "jasaotp_order_cancel"])->middleware("auth");

Route::get("/miraipedia/service", [ServiceAPIController::class, "miraipedia_service"]);
Route::post("/miraipedia/order", [ServiceAPIController::class, "miraipedia_order"])->middleware("auth");
Route::post("/miraipedia/refill", [ServiceAPIController::class, "miraipedia_refill"])->middleware("auth");
Route::post("/miraipedia/refill/status", [ServiceAPIController::class, "miraipedia_refill_status"])->middleware("auth");
Route::post("/miraipedia/status", [ServiceAPIController::class, "miraipedia_orders_status"])->middleware("auth");

Route::post("/iskapay/payments", [ServiceAPIController::class, "iskapay_create_payment"]);
Route::get("/iskapay/payments/{merchant_order_id}", [ServiceAPIController::class, "iskapay_payment_status"]);
Route::post("/iskapay/payments/{merchant_order_id}/cancel", [ServiceAPIController::class, "iskapay_cancel_payment"]);

Route::get('/history', [DepositController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);
    
    Route::put('/update/saldo', [UserController::class, 'updateSaldo']);
    Route::get('/history/user', [DepositController::class, 'indexByUser']);
    Route::post('/history/user/create', [DepositController::class, 'store']);
    Route::delete('/history/user/delete/{id}', [DepositController::class, 'destroy']);
    
    Route::middleware("role:1")->prefix("/admin")->group(function () {
        Route::get("/users", [UserController::class, "index"]);
        Route::put("/users/{id}", [UserController::class, "update"]);
        Route::get("/transaction", [TransactionController::class, "indexAdmin"]);
        Route::resource("/news", NewsController::class);
        Route::get('/popup-news', [ServiceAPIController::class, 'popup_news']);
        
        Route::resource('/service/nokos', ServiceNokosController::class);
        Route::resource('/service/suntik', ServiceSuntikController::class);
        
        Route::resource("/guide", GuideController::class);
        Route::resource("/customer-service", CustomerServiceController::class);
    });

    Route::prefix("/customer")->group(function () {
        Route::get("/service/suntik", [ServiceSuntikController::class, "index"]);
        Route::get("/service/nokos", [ServiceNokosController::class, "index"]);
        Route::get("/news", [NewsController::class, "index"]);

        Route::resource("/transaction", TransactionController::class);
        Route::get("/guide/{id}", [GuideController::class,"show"]);
        Route::get("/customer-service", [CustomerServiceController::class,"index"]);
    });
});




