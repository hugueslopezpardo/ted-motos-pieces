<?php

namespace App\Models\Location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class LocationContinent
 *
 * Represents a continent in the application's geographical context.
 *
 * Each continent can be associated with multiple regions or countries,
 * allowing for geographical categorization of various entities in the
 * application.
 *
 * @package App\Models\Location
 */
class LocationContinent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the continent
        'slug'  // A URL-friendly identifier for the continent
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', // Hide the timestamp when the continent was created
        'updated_at'  // Hide the timestamp when the continent was last updated
    ];

    /**
     * Get the regions associated with the continent.
     *
     * @return HasMany - The relationship to the LocationRegion model
     */
    public function regions(): HasMany
    {
        return $this->hasMany(LocationRegion::class);
    }
}
