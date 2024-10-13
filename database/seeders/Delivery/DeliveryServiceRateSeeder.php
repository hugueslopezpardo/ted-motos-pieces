<?php

namespace Database\Seeders\Delivery;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryServiceRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deliveryServiceRates = [
            1 => [ // La Poste - Colis léger
                ['min_weight' => 0, 'max_weight' => 1, 'rate' => 8.10, 'location_region_type_id' => 1],
                ['min_weight' => 1, 'max_weight' => 4, 'rate' => 14.90, 'location_region_type_id' => 1],
                ['min_weight' => 4, 'max_weight' => 10, 'rate' => 22.70, 'location_region_type_id' => 1],
                ['min_weight' => 10, 'max_weight' => 20, 'rate' => 35.55, 'location_region_type_id' => 1],
                ['min_weight' => 20, 'max_weight' => 30, 'rate' => 35.55, 'location_region_type_id' => 1],

                /*
                ['min_weight' => 0, 'max_weight' => 0.5, 'rate' => 12.65, 'location_region_type_id' => 2],
                ['min_weight' => 0.5, 'max_weight' => 1, 'rate' => 20, 'location_region_type_id' => 2],
                ['min_weight' => 1, 'max_weight' => 2, 'rate' => 27.25, 'location_region_type_id' => 2],
                ['min_weight' => 2, 'max_weight' => 5, 'rate' => 40.95, 'location_region_type_id' => 2],
                ['min_weight' => 5, 'max_weight' => 10, 'rate' => 65.60, 'location_region_type_id' => 2],
                ['min_weight' => 10, 'max_weight' => 15, 'rate' => 137.05, 'location_region_type_id' => 2],
                ['min_weight' => 15, 'max_weight' => 30, 'rate' => 150.55 , 'location_region_type_id' => 2],

                ['min_weight' => 0, 'max_weight' => 0.5, 'rate' => 12.85, 'location_region_type_id' => 3],
                ['min_weight' => 0.5, 'max_weight' => 1, 'rate' => 19.95, 'location_region_type_id' => 3],
                ['min_weight' => 1, 'max_weight' => 2, 'rate' => 35.25, 'location_region_type_id' => 3],
                ['min_weight' => 2, 'max_weight' => 5, 'rate' => 58.90, 'location_region_type_id' => 3],
                ['min_weight' => 5, 'max_weight' => 10, 'rate' => 115.35, 'location_region_type_id' => 3],
                ['min_weight' => 10, 'max_weight' => 15, 'rate' => 263.15, 'location_region_type_id' => 3],
                ['min_weight' => 15, 'max_weight' => 30, 'rate' => 302.35 , 'location_region_type_id' => 3],
                */
            ],
            2 => [ // La Poste - Colis lourd
                ['min_weight' => 0, 'max_weight' => 1, 'rate' => 14.80, 'location_region_type_id' => 1],
                ['min_weight' => 1, 'max_weight' => 4, 'rate' => 21.60, 'location_region_type_id' => 1],
                ['min_weight' => 4, 'max_weight' => 10, 'rate' => 28.70, 'location_region_type_id' => 1],
                ['min_weight' => 10, 'max_weight' => 15, 'rate' => 34.70, 'location_region_type_id' => 1],
                ['min_weight' => 15, 'max_weight' => 30, 'rate' => 41.55, 'location_region_type_id' => 1],
            ],
        ];

        for ($i = 1; $i <= 2; $i++) {
            foreach ($deliveryServiceRates[$i] as $deliveryServiceRate) {
                DB::table('delivery_service_rates')->insert([
                    'min_weight' => $deliveryServiceRate['min_weight'],
                    'max_weight' => $deliveryServiceRate['max_weight'],
                    'rate' => $deliveryServiceRate['rate'],
                    'delivery_service_id' => $i,
                    'location_region_type_id' => $deliveryServiceRate['location_region_type_id'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

    }
}
