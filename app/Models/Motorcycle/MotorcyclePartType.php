<?php

namespace App\Models\Motorcycle;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MotorcyclePartType
 *
 * Represents the type of motorcycle parts. This model allows for
 * categorizing parts into specific types, enabling better organization
 * and retrieval of part information.
 *
 * @package App\Models\Motorcycle
 */
class MotorcyclePartType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the part type (e.g., 'Brake', 'Tire', etc.)
        'slug', // A URL-friendly version of the part type name
        'motorcycle_part_category_id', // The category to which this part type belongs
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', // Hide the creation timestamp
        'updated_at', // Hide the last updated timestamp
        'motorcycle_part_category_id', // Hide the foreign key for category
    ];

    /**
     * Get the category that owns the part type.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(MotorcyclePartCategory::class, 'motorcycle_part_category_id');
    }

    public function parts()
    {
        return $this->hasMany(MotorcyclePart::class);
    }

}
