<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceSuntik extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = "service_suntiks";
    protected $fillable = [
        'service_id',
        'name',
        'type',
        'api_type',
        'category',
        'price',
        'old_price',
        'min',
        'max',
        'description',
        'refill',
        'average_time',
    ];

    protected $casts = [
        'service_id' => 'integer',
        'price' => 'integer',
        'old_price' => 'integer',
        'min' => 'integer',
        'max' => 'integer',
        'refill' => 'integer',
    ];
}
