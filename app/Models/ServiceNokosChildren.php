<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceNokosChildren extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'service_nokos_childrens';
    protected $fillable = [
        'nokos_parent_id',
        'country',
        "stock",
        'price'
    ];
}
