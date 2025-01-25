<?php

namespace App\Models\Motorcycle;

use App\Models\Delivery\DeliveryService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class MotorcyclePart
 *
 * Represents a part of a motorcycle. This model encapsulates
 * the properties and relationships related to motorcycle parts,
 * including their attributes and the associations with motorcycles,
 * types, qualities, and delivery services.
 *
 * @package App\Models\Motorcycle
 */
class MotorcyclePart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',                     // The name of the motorcycle part
        'description',              // A description of the motorcycle part
        'price',                    // The price of the motorcycle part
        'weight',                   // The weight of the motorcycle part
        'images',                   // The images associated with the part
        'is_active',                // Indicates if the part is active
        'is_heavy',                 // Indicates if the part is considered heavy
        'is_sold_out',              // Indicates if the part is sold out
        'motorcycle_id',            // The foreign key for the motorcycle that this part belongs to
        'motorcycle_part_type_id',  // The foreign key for the type of the part
        'motorcycle_part_quality_id',// The foreign key for the quality of the part
        'delivery_service_id',      // The foreign key for the delivery service associated with the part
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',                // Hide the creation timestamp
        'updated_at',                // Hide the last updated timestamp
        'motorcycle_id',             // Hide the foreign key for the motorcycle
        'motorcycle_part_type_id',   // Hide the foreign key for the part type
        'motorcycle_part_quality_id', // Hide the foreign key for the part quality
        'delivery_service_id',       // Hide the foreign key for the delivery service
    ];

    /**
     * The attributes that should be cast to specific types.
     *
     * @var array
     */
    protected $casts = [
        'images' => 'array',         // Cast the images attribute to an array
    ];

    /**
     * Get the motorcycle that owns the part.
     *
     * @return BelongsTo - The motorcycle that owns this part.
     */
    public function motorcycle(): BelongsTo
    {
        return $this->belongsTo(Motorcycle::class, 'motorcycle_id');
    }

    /**
     * Get the type of the part.
     *
     * @return BelongsTo - The type of the motorcycle part.
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(MotorcyclePartType::class, 'motorcycle_part_type_id');
    }

    /**
     * Get the quality of the part.
     *
     * @return BelongsTo - The quality of the motorcycle part.
     */
    public function quality(): BelongsTo
    {
        return $this->belongsTo(MotorcyclePartQuality::class, 'motorcycle_part_quality_id');
    }

    /**
     * Get the delivery service of the part.
     *
     * @return BelongsTo - The delivery service associated with this part.
     */
    public function deliveryService(): BelongsTo
    {
        return $this->belongsTo(DeliveryService::class, 'delivery_service_id');
    }



    public function getFullImagesPathAttribute(): array
    {
        $images = [];
        foreach ($this->images as $image) {
            $images[] = asset('storage/' . $image);
        }
        return $images;
    }

}
