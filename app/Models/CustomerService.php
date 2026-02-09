<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CustomerService extends Model
{
    use HasApiTokens, Notifiable, HasFactory;
    protected $table = "customer_services";
    protected $fillable = [
        "name",
        "desc",
        "phone",
    ];
}
