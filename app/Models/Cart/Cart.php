<?php

namespace App\Models\Cart;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Cart
 *
 * Represents a shopping cart in the application.
 *
 * A cart can be associated with a user and can contain multiple items.
 * It provides methods to interact with the cart's data, including
 * retrieving its owner and calculating the total price of items.
 *
 * @package App\Models\Cart
 */
class Cart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', // The ID of the user who owns the cart
        'token'    // A unique token for the cart (e.g., for guest users)
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'token',      // Hide the token for security reasons
        'created_at', // Hide timestamps for external visibility
        'updated_at'  // Hide timestamps for external visibility
    ];


    public static function getNbProducts(int $user_id): int
    {
        $cart = Cart::where('user_id', $user_id)->first();
        return $cart ? $cart->items()->count() : 0;
    }

    /**
     * Get the user that owns the cart.
     *
     * @return BelongsTo - The relationship to the User model
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items in the cart.
     * @return HasMany - The relationship to the CartItem model
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Calculate the total price of the items in the cart.
     *
     * @return float - The total price of all items in the cart
     */
    public function total(): float
    {
        return $this->items->sum(function ($item) {
            return $item->motorcyclePart->price; // Assuming motorcyclePart has a price attribute
        });
    }

    /**
     * Get the number of items in the cart.
     * @return int - The count of items in the cart
     */
    public function itemCount(): int
    {
        return $this->items()->count(); // Return the count of associated cart items
    }
}
