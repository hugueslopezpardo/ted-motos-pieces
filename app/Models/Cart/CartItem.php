<?php

namespace App\Models\Cart;

use App\Models\Motorcycle\MotorcyclePart;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class CartItem
 *
 * Represents an item within a shopping cart.
 *
 * Each cart item is linked to a specific cart and a motorcycle part,
 * allowing for the management of parts within the user's cart.
 *
 * @package App\Models\Cart
 */
class CartItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cart_id',             // The ID of the cart that this item belongs to
        'motorcycle_part_id'   // The ID of the motorcycle part being added to the cart
    ];

    /**
     * Get the cart that owns the CartItem.
     *
     * @return BelongsTo - The relationship to the Cart model
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Get the motorcycle part that owns the CartItem.
     *
     * @return BelongsTo - The relationship to the MotorcyclePart model
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(MotorcyclePart::class, 'motorcycle_part_id');
    }

    /**
     * Get the price of the motorcycle part for this CartItem.
     *
     * @return float|null - The price of the part, or null if not found
     */
    public function price(): ?float
    {
        return $this->part ? $this->part->price : null; // Assuming MotorcyclePart has a price attribute
    }
}
