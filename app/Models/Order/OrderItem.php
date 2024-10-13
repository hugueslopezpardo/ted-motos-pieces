<?php

namespace App\Models\Order;

use App\Models\Motorcycle\MotorcyclePart;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class OrderItem
 *
 * Represents an item within an order, linking a specific
 * motorcycle part to the order it belongs to.
 *
 * @package App\Models\Order
 */
class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',             // Foreign key for the associated order
        'motorcycle_part_id',   // Foreign key for the motorcycle part
    ];

    /**
     * Get the order that owns the order item.
     *
     * @return BelongsTo - The order associated with this order item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /**
     * Get the part of the order item.
     *
     * @return BelongsTo - The motorcycle part associated with this order item.
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(MotorcyclePart::class, 'motorcycle_part_id');
    }
}
