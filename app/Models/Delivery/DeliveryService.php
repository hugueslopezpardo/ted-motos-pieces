<?php

namespace App\Models\Delivery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class DeliveryService
 *
 * Represents a delivery service offered by the application.
 *
 * Each delivery service can have multiple rates associated with it,
 * which can vary based on factors such as weight and destination.
 *
 * @package App\Models\Delivery
 */
class DeliveryService extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the delivery service
        'slug'  // A URL-friendly identifier for the delivery service
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', // Hide the timestamp when the service was created
        'updated_at'  // Hide the timestamp when the service was last updated
    ];

    /**
     * Get the rates for the delivery service.
     *
     * @return HasMany - The relationship to the DeliveryServiceRate model
     */
    public function rates(): HasMany
    {
        return $this->hasMany(DeliveryServiceRate::class);
    }
}
