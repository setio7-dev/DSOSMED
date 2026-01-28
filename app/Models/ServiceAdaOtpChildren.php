<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceAdaOtpChildren extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = "service_ada_otp_childrens";
    protected $fillable = [
        'parent_id',
        'service_id',
        'name',
        'iso',
        'prefix',
        'price',
        'stock',
        'delivery_percent',
        'operator',
        'quality_score',
        'provider_rate',
        'current_demand_status',
        'avg_delivery_time',
        'avg_delivery_time_formatted',
    ];
}
