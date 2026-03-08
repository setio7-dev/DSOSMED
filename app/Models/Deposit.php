<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Deposit extends Model
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $fillable = [
        "merchant_order_id",
        "amount",
        "payment_method",
        "user_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected $casts = [
        'amount' => 'integer',
        'user_id' => 'integer',
    ];
}
