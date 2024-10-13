<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Represents an order status.
 */
class OrderStatus extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var array - The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'slug'
    ];

    /**
     * Get the orders with this status.
     * @return HasMany - The orders with this status.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'order_status_id');
    }

}
