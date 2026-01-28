<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceAdaOtpParent extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = "service_ada_otp_parents";
    protected $fillable = [
        "parent_service_id",
        "text",
        "description",
        "icon"
    ];

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(ServiceAdaOtpChildren::class, 'parent_id');
    }
}
