<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class PopupNews extends Model
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $table = 'popup_news';

    protected $fillable = [
        'tanggal',
        'id_layanan',
        'nama_layanan',
        'keterangan',
        'old_price',
        'new_price'
    ];

    protected $casts = [
        'id_layanan' => 'integer',
        'old_price' => 'integer',
        'new_price' => 'integer',
    ];
}
