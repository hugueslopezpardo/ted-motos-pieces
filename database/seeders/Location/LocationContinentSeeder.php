<?php

namespace Database\Seeders\Location;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Seeder for the location_continents table.
 */
class LocationContinentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $continents = [
            ['name' => 'Afrique'],
            ['name' => 'Antarctique'],
            ['name' => 'Asie'],
            ['name' => 'Europe'],
            ['name' => 'Amérique du Nord'],
            ['name' => 'Océanie'],
            ['name' => 'Amérique du Sud'],
        ];

        foreach ($continents as $continent) {
            DB::table('location_continents')->insert([
                'name' => $continent['name'],
                'slug' => Str::slug($continent['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
