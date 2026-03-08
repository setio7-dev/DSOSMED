<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NokosCountry extends Model
{
    use HasApiTokens, Notifiable, HasFactory;
    protected $table = "nokos_countries";
    protected $fillable = [
        "nokos_service_id",
        "type",
        "provider_country_id",
        "provider_service_id",
        "country_name",
        "iso",
        "prefix",
        "operator",
        "price",
        "stock",
        "quality_score"
    ];

    protected $casts = [
        'nokos_service_id' => 'integer',
        'provider_country_id' => 'integer',
        'provider_service_id' => 'integer',
        'price' => 'integer',
        'stock' => 'integer',
        'quality_score' => 'integer',
    ];
}
