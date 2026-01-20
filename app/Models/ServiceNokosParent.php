<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ServiceNokosParent extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'service_nokos_parents';
    protected $fillable = [
        'name',
        'image',
    ];

    /**
     * Get all of the comments for the serviceNokosParent
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function child()
    {
        return $this->hasMany(serviceNokosChildren::class, 'nokos_parent_id', 'id');
    }
}
