<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class LocationRegionType
 *
 * Represents a type of geographical region, which can be used to categorize
 * regions based on various criteria (e.g., state, province, territory).
 * This model serves as a way to define the classification of regions,
 * allowing for more organized management and retrieval of related regions
 * in the application.
 *
 * @package App\Models\Location
 */
class LocationRegionType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the region type
        'slug'  // A URL-friendly identifier for the region type
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', // Hide the timestamp when the region type was created
        'updated_at'  // Hide the timestamp when the region type was last updated
    ];

    /**
     * Get the regions that belong to this type.
     *
     * @return HasMany - The relationship to the LocationRegion model
     */
    public function regions(): HasMany
    {
        return $this->hasMany(LocationRegion::class);
    }
}
