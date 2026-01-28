<?php

use App\Http\Controllers\MedanPediaController;
use App\Http\Controllers\ServiceAdaOtpController;
use App\Http\Controllers\ServiceAPIController;
use App\Http\Controllers\ServiceNokosController;
use App\Http\Controllers\ServiceSuntikController;
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

Route::get("/medanpedia/services", [ServiceAPIController::class, "medanpedia_api_services"]);
Route::get("/medanpedia/profile", [ServiceAPIController::class, "medanpedia_api_profile"]);

Route::middleware('auth')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [UserController::class, 'logout']);


    Route::middleware("role:1")->prefix("/admin")->group(function () {
        Route::get("/users", [UserController::class, "index"]);
        Route::put("/users/{id}", [UserController::class, "update"]);

        Route::resource('/service/nokos', ServiceNokosController::class);
        Route::resource('/service/adaotp', ServiceAdaOtpController::class);
        Route::resource('/service/medanpedia', ServiceSuntikController::class);
    });

    Route::prefix("/customer")->group(function () {
        Route::get('/service/nokos', [ServiceNokosController::class, 'index']);
    });
});


