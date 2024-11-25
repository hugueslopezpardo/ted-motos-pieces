<?php

namespace App\Models\Motorcycle;

use App\Models\Location\LocationContinent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class MotorcycleBrand
 *
 * Represents a brand of motorcycles. This model encapsulates
 * the properties and relationships related to a motorcycle brand,
 * including its name, slug, and the continent it belongs to.
 *
 * @package App\Models\Motorcycle
 */
class MotorcycleBrand extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',                    // The name of the motorcycle brand
        'slug',                    // A URL-friendly version of the brand name
        'location_continent_id',   // The foreign key for the continent where the brand is located
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'location_continent_id', // Hide the foreign key for the continent in serialized responses
        'created_at',            // Hide the creation timestamp
        'updated_at',            // Hide the last updated timestamp
    ];

    /**
     * Get the continent that the brand belongs to.
     *
     * @return BelongsTo - The continent that the motorcycle brand is associated with.
     */
    public function continent(): BelongsTo
    {
        return $this->belongsTo(LocationContinent::class, 'location_continent_id');
    }
}
