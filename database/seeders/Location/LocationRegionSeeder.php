<?php

namespace Database\Seeders\Location;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LocationRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $frenchRegions = [
            // Metropolitan
            ['name' => 'Auvergne-Rhône-Alpes', 'location_region_type_id' => 1],
            ['name' => 'Bourgogne-Franche-Comté', 'location_region_type_id' => 1],
            ['name' => 'Bretagne', 'location_region_type_id' => 1],
            ['name' => 'Centre-Val de Loire', 'location_region_type_id' => 1],
            ['name' => 'Grand Est', 'location_region_type_id' => 1],
            ['name' => 'Hauts-de-France', 'location_region_type_id' => 1],
            ['name' => 'Île-de-France', 'location_region_type_id' => 1],
            ['name' => 'Normandie', 'location_region_type_id' => 1],
            ['name' => 'Nouvelle-Aquitaine', 'location_region_type_id' => 1],
            ['name' => 'Occitanie', 'location_region_type_id' => 1],
            ['name' => 'Pays de la Loire', 'location_region_type_id' => 1],
            ['name' => 'Provence-Alpes-Côte d\'Azur', 'location_region_type_id' => 1],

            // Metropolitan Island
            ['name' => 'Corse', 'location_region_type_id' => 1]
            /*

            // Overseas Zone 1
            ['name' => 'Guadeloupe', 'location_region_type_id' => 2],
            ['name' => 'Martinique', 'location_region_type_id' => 2],
            ['name' => 'Guyane', 'location_region_type_id' => 2],
            ['name' => 'La Réunion', 'location_region_type_id' => 2],
            ['name' => 'Mayotte', 'location_region_type_id' => 2],
            ['name' => 'Saint-Pierre-et-Miquelon', 'location_region_type_id' => 2],
            ['name' => 'Saint-Martin', 'location_region_type_id' => 2],
            ['name' => 'Saint-Barthélemy', 'location_region_type_id' => 2],

            // Overseas Zone 2
            ['name' => 'Nouvelle-Calédonie', 'location_region_type_id' => 3],
            ['name' => 'Polynésie Française', 'location_region_type_id' => 3],
            ['name' => 'Wallis-et-Futuna', 'location_region_type_id' => 3],
            ['name' => 'Terres australes et antarctiques françaises', 'location_region_type_id' => 3]
            */

        ];

        foreach ($frenchRegions as $frenchRegion) {
            DB::table('location_regions')->insert([
                'name' => $frenchRegion['name'],
                'slug' => Str::slug($frenchRegion['name']),
                'location_region_type_id' => $frenchRegion['location_region_type_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
