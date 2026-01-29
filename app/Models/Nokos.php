<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Nokos extends Model
{
    //
    use HasFactory, Notifiable;

    protected $fillable = [
        "service_name",
        "price",
        "user_id"
    ];
    
     public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
