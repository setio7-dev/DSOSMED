<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceVirtusimChildren extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = "service_virtusim_childrens";
    protected $fillable = [
        "parent_id",
        "service_id",
        'name',
        'price',
        'is_promo',
        'tersedia',
        'provider_service_id',
        'country',
        'status',
        'category',
    ];
}
