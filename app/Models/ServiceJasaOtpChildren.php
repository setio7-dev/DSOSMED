<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceJasaOtpChildren extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "service_jasa_otp_childrens";
    protected $fillable = [
        "parent_id",
        "code",
        "price",
        "service",
        "operator",
        "stock"
    ];
}
