<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class LocationRegion
 *
 * Represents a geographical region, which can contain multiple departments.
 *
 * Each region is associated with a specific type (e.g., state, province)
 * and can serve as a way to group departments within a larger geographic
 * area, allowing for more granular organization of entities in the
 * application.
 *
 * @package App\Models\Location
 */
class LocationRegion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'location_region_type_id', // The ID of the associated region type
        'name',                    // The name of the region
        'slug'                     // A URL-friendly identifier for the region
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'location_region_type_id', // Hide the region type ID for security reasons
        'created_at',              // Hide the timestamp when the region was created
        'updated_at'               // Hide the timestamp when the region was last updated
    ];

    /**
     * Get the region type that this region belongs to.
     *
     * @return BelongsTo - The relationship to the LocationRegionType model
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(LocationRegionType::class, 'location_region_type_id');
    }

    /**
     * Get the departments that belong to this region.
     *
     * @return HasMany - The relationship to the LocationDepartment model
     */
    public function departments(): HasMany
    {
        return $this->hasMany(LocationDepartment::class);
    }
}
