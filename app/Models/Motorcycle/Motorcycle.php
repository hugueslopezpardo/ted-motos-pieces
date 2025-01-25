<?php

namespace App\Models\Motorcycle;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Motorcycle
 *
 * Represents a motorcycle in the system. This model encapsulates
 * the properties and relationships related to a motorcycle, including
 * its brand and associated parts. It provides methods to retrieve
 * information about the motorcycle's availability and sales.
 *
 * @package App\Models\Motorcycle
 */
class Motorcycle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',               // The name of the motorcycle
        'year',               // The year the motorcycle was manufactured
        'description',        // A brief description of the motorcycle
        'image_path',         // The file path to the motorcycle's image
        'is_on_sale',         // Indicates if the motorcycle is currently for sale
        'is_archived',        // Indicates if the motorcycle is archived
        'motorcycle_brand_id', // The foreign key for the motorcycle's brand
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'motorcycle_brand_id', // Hide the foreign key for the brand in serialized responses
    ];

    /**
     * Get the brand of the motorcycle.
     *
     * @return BelongsTo - The brand that the motorcycle belongs to.
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(MotorcycleBrand::class, 'motorcycle_brand_id');
    }

    /**
     * Get the parts associated with the motorcycle.
     *
     * @return HasMany - The parts that belong to this motorcycle.
     */
    public function parts(): HasMany
    {
        return $this->hasMany(MotorcyclePart::class, 'motorcycle_id');
    }

    public function getFullImagePathAttribute(): string
    {
        return asset('storage/' . $this->image_path);
    }

    /**
     * Get the number of parts sold.
     *
     * @return int - The total number of parts that have been sold.
     */
    public function nbPartsSold(): int
    {
        return $this->parts()->where('is_sold', true)->count();
    }

    /**
     * Get the number of parts available for sale.
     *
     * @return int - The total number of parts that are available for sale.
     */
    public function nbPartsAvailable(): int
    {
        return $this->parts()->where('is_sold', false)->count();
    }
}
