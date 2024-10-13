<?php

namespace Database\Seeders;

use App\Models\Motorcycle\MotorcyclePart;
use App\Models\User\User;
use Database\Factories\Motorcycle\MotorcyclePartFactory;
use Database\Seeders\Delivery\DeliveryServiceRateSeeder;
use Database\Seeders\Delivery\DeliveryServiceSeeder;
use Database\Seeders\Location\LocationContinentSeeder;
use Database\Seeders\Location\LocationDepartmentSeeder;
use Database\Seeders\Location\LocationRegionSeeder;
use Database\Seeders\Location\LocationRegionTypeSeeder;
use Database\Seeders\Motorcycle\MotorcycleBrandSeeder;
use Database\Seeders\Motorcycle\MotorcyclePartCategorySeeder;
use Database\Seeders\Motorcycle\MotorcyclePartQualitySeeder;
use Database\Seeders\Motorcycle\MotorcyclePartTypeSeeder;
use Database\Seeders\Order\OrderStatusSeeder;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationContinentSeeder::class,
            LocationRegionTypeSeeder::class,
            LocationRegionSeeder::class,
            LocationDepartmentSeeder::class,
            DeliveryServiceSeeder::class,
            DeliveryServiceRateSeeder::class,
            MotorcycleBrandSeeder::class,
            MotorcyclePartQualitySeeder::class,
            MotorcyclePartCategorySeeder::class,
            MotorcyclePartTypeSeeder::class,
            OrderStatusSeeder::class,
        ]);
    }
}
