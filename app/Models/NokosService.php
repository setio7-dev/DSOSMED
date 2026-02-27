<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NokosService extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "nokos_services";
    protected $fillable = [
        "code",
        "name",
        "icon"
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function country()
    {
        return $this->hasMany(NokosCountry::class, 'nokos_service_id');
    }
}
