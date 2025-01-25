<?php

namespace App\Models\Motorcycle;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class MotorcyclePartCategory
 *
 * Represents a category for motorcycle parts. This model encapsulates
 * the properties and relationships associated with motorcycle part categories,
 * allowing for the organization of parts into distinct categories.
 *
 * @package App\Models\Motorcycle
 */
class MotorcyclePartCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the part category
        'slug', // A URL-friendly version of the category name
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', // Hide the creation timestamp
        'updated_at', // Hide the last updated timestamp
    ];

    /**
     * Get the parts that belong to this category.
     *
     * @return HasMany - The motorcycle parts associated with this category.
     */
    public function parts(): HasMany
    {
        return $this->hasMany(MotorcyclePart::class, 'motorcycle_part_category_id');
    }
}
