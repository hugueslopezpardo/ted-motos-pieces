<?php

namespace Database\Seeders\Motorcycle;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MotorcycleBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            // America
            ['name' => 'Harley-Davidson', 'location_continent_id' => 5],
            ['name' => 'Indian', 'location_continent_id' => 5],
            ['name' => 'Buell', 'location_continent_id' => 5],
            ['name' => 'Zero Motorcycles', 'location_continent_id' => 5],
            ['name' => 'Confederate Motors', 'location_continent_id' => 5],
            ['name' => 'Lightning Motorcycles', 'location_continent_id' => 5],
            ['name' => 'MotoCzysz', 'location_continent_id' => 5],
            ['name' => 'Victory', 'location_continent_id' => 5],

            // Europe
            ['name' => 'Ducati', 'location_continent_id' => 4],
            ['name' => 'Aprilia', 'location_continent_id' => 4],
            ['name' => 'MV Agusta', 'location_continent_id' => 4],
            ['name' => 'Bimota', 'location_continent_id' => 4],
            ['name' => 'Benelli', 'location_continent_id' => 4],
            ['name' => 'Moto Guzzi', 'location_continent_id' => 4],
            ['name' => 'BMW', 'location_continent_id' => 4],
            ['name' => 'KTM', 'location_continent_id' => 4],
            ['name' => 'Husqvarna', 'location_continent_id' => 4],
            ['name' => 'Triumph', 'location_continent_id' => 4],
            ['name' => 'Norton', 'location_continent_id' => 4],
            ['name' => 'Voxan', 'location_continent_id' => 4],
            ['name' => 'MZ', 'location_continent_id' => 4],
            ['name' => 'Laverda', 'location_continent_id' => 4],

            // Asia
            ['name' => 'Yamaha', 'location_continent_id' => 3],
            ['name' => 'Kawasaki', 'location_continent_id' => 3],
            ['name' => 'Suzuki', 'location_continent_id' => 3],
            ['name' => 'Honda', 'location_continent_id' => 3],
            ['name' => 'Kymco', 'location_continent_id' => 3],
            ['name' => 'CFMoto', 'location_continent_id' => 3],
            ['name' => 'Hyosung', 'location_continent_id' => 3],
            ['name' => 'Bajaj', 'location_continent_id' => 3],
            ['name' => 'Hero', 'location_continent_id' => 3],
            ['name' => 'TVS', 'location_continent_id' => 3]
        ];

        foreach ($brands as $brand) {
            DB::table('motorcycle_brands')->insert([
                'name' => $brand['name'],
                'slug' => Str::slug($brand['name']),
                'location_continent_id' => $brand['location_continent_id'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

    }
}
