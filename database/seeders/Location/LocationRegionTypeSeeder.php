<?php

namespace Database\Seeders\Location;

use App\Models\Location\LocationRegionType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LocationRegionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regionTypes = [
            ['name' => 'Métropolitaine']
            // ['name' => 'Outre-Mer Zone 1'],
            // ['name' => 'Outre-Mer Zone 2']
        ];

        foreach ($regionTypes as $regionType) {
            LocationRegionType::create([
                'name' => $regionType['name'],
                'slug' => Str::slug($regionType['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
