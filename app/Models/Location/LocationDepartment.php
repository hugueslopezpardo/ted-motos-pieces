<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class LocationDepartment
 *
 * Represents a department within a specific region in the application's
 * geographical context.
 *
 * Each department is associated with a particular region and serves
 * as a subdivision of that region, allowing for more granular
 * geographical categorization of entities within the application.
 *
 * @package App\Models\Location
 */
class LocationDepartment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'location_region_id', // The ID of the associated region
        'name',               // The name of the department
        'slug'                // A URL-friendly identifier for the department
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'location_region_id', // Hide the region ID for security reasons
        'created_at',         // Hide the timestamp when the department was created
        'updated_at'          // Hide the timestamp when the department was last updated
    ];

    /**
     * Get the region that this department belongs to.
     *
     * @return BelongsTo - The relationship to the LocationRegion model
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(LocationRegion::class, 'location_region_id');
    }
}
