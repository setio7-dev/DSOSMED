<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceVirtusimParent extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'service_virtusim_parents';
    protected $fillable = [
        'parent_service_id',
        'country_code',
        'country_name',
        'img_link',
    ];

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(ServiceVirtusimChildren::class, 'parent_id');
    }
}
