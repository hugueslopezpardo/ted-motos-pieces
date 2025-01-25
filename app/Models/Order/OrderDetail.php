<?php

namespace App\Models\Order;

use App\Models\Location\LocationDepartment;
use App\Models\Location\LocationRegion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class OrderDetail
 *
 * Represents the detailed information of an order, including
 * the associated location details such as region, department,
 * postal code, city, and address.
 *
 * @package App\Models\Order
 */
class OrderDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',             // Foreign key for the associated order
        'region',               // Region for delivery
        'department',           // Department for delivery
        'address',              // Street address for delivery
        'postal_code',          // Postal code for delivery
        'city',                 // City for delivery
        'address',              // Street address for delivery
    ];

    /**
     * Get the order that owns the order detail.
     *
     * @return BelongsTo - The order associated with the order detail.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

}
