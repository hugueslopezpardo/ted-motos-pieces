<?php

namespace App\Models\User;

use App\Models\Location\LocationDepartment;
use App\Models\Location\LocationRegion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone_number',
        'location_region_id',
        'location_department_id',
        'postal_code',
        'address',
        'city',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function locationRegion()
    {
        return $this->belongsTo(LocationRegion::class);
    }

    public function locationDepartment()
    {
        return $this->belongsTo(LocationDepartment::class);
    }

    public function getFullAddressAttribute()
    {
        return "{$this->address}, {$this->postal_code}, {$this->city}";
    }

    public function getFullLocationAttribute()
    {
        return "{$this->locationDepartment->name}, {$this->locationRegion->name}";
    }

    public function getFullLocationWithAddressAttribute()
    {
        return "{$this->getFullLocationAttribute()} - {$this->getFullAddressAttribute()}";
    }

}
