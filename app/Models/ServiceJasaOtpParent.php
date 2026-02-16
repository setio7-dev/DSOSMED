<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceJasaOtpParent extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = "service_jasa_otp_parents";
    protected $fillable = [
        "country_id",
        "country"
    ];

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(ServiceJasaOtpChildren::class, 'parent_id');
    }
}
