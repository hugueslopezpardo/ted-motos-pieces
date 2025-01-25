<?php

namespace App\Models\Order;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Order
 *
 * Represents a customer order within the system. This model encapsulates
 * the order details, including the associated user, status, items, and
 * additional details related to the order.
 *
 * @package App\Models\Order
 */
class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',   // Foreign key for the user who placed the order
        'reference', // Unique identifier for the order
        'total',     // Total amount for the order
        'delivery_price', // Delivery rate for the order
        'delivery_service', // Delivery service for the order (La Poste, Mondial Relay, etc.)
        'order_status_id' // Foreign key for the order status
    ];


    public static function totalSales(): int
    {
        return Order::sum('total');
    }

    /**
     * Get the user that owns the order.
     *
     * @return BelongsTo - The user that owns the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the status of the order.
     *
     * @return BelongsTo - The status of the order.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }

    /**
     * Get the items of the order.
     *
     * @return HasMany - The items that belong to the order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the detail of the order.
     *
     * @return HasOne - The detail associated with the order.
     */
    public function detail(): HasOne
    {
        return $this->hasOne(OrderDetail::class);
    }
}
