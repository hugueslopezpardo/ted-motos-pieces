<?php

namespace App\Models\Delivery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Location\LocationRegionType;

/**
 * Class DeliveryServiceRate
 *
 * Represents the rate associated with a specific delivery service
 * based on weight and region type.
 *
 * Each rate defines the cost of delivering a package based on
 * the weight of the package and the type of region it is being
 * delivered to.
 *
 * @package App\Models\Delivery
 */
class DeliveryServiceRate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'delivery_service_id',       // The ID of the associated delivery service
        'location_region_type_id',   // The ID of the region type for this rate
        'min_weight',                // The minimum weight for this rate
        'max_weight',                // The maximum weight for this rate
        'rate'                       // The delivery cost for the specified weight range and region type
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'delivery_service_id',       // Hide the delivery service ID for security reasons
        'location_region_type_id',   // Hide the region type ID for security reasons
        'created_at',                // Hide the timestamp when the rate was created
        'updated_at'                 // Hide the timestamp when the rate was last updated
    ];

    /**
     * Get the delivery service that this rate belongs to.
     *
     * @return BelongsTo - The relationship to the DeliveryService model
     */
    public function deliveryService(): BelongsTo
    {
        return $this->belongsTo(DeliveryService::class, 'delivery_service_id');
    }

    /**
     * Get the region type that this rate belongs to.
     *
     * @return BelongsTo - The relationship to the LocationRegionType model
     */
    public function regionType(): BelongsTo
    {
        return $this->belongsTo(LocationRegionType::class, 'location_region_type_id');
    }
}
