<?php

namespace App\Models\User;

use App\Models\Cart\Cart;
use App\Models\Order\Order;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 *
 * Represents a user of the application, with properties for authentication,
 * and functionalities related to user roles and relationships.
 *
 * @package App\Models\User
 */
class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_blocked',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
        'is_blocked' => 'boolean',
    ];


    /**
     * Get the user's carts.
     *
     * @return HasMany - The user's carts.
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Get the user's orders.
     *
     * @return HasMany - The user's orders.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function details(): HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    /**
     * Determine if the user is an administrator.
     *
     * @return bool - Whether the user is an administrator.
     */
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    /**
     * Determine if the user is blocked.
     *
     * @return bool - Whether the user is blocked.
     */
    public function isBlocked(): bool
    {
        return $this->is_blocked;
    }

    /**
     * Determine if the user can access the Filament admin panel.
     *
     * @param Panel $panel - The panel to check access for.
     * @return bool - Whether the user can access the panel.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }
}
