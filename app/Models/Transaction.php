<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Transaction extends Model
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $table = "transactions";
    protected $fillable = [
        "name",
        "service_id",
        "type",
        "user_id",
        "order_id",
        "price",
        "quantity",
        "status",
        "result",
        "target",
    ];

    /**
     * Get the user that owns the Transaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
