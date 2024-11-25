<?php

namespace App\Models\Motorcycle;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MotorcyclePartQuality
 *
 * Represents the quality of motorcycle parts. This model encapsulates
 * the properties associated with the quality of motorcycle parts,
 * allowing for categorization based on quality standards.
 *
 * @package App\Models\Motorcycle
 */
class MotorcyclePartQuality extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // The name of the quality (e.g., 'High', 'Medium', 'Low')
        'slug', // A URL-friendly version of the quality name
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
}
