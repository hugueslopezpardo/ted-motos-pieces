<?php

namespace Database\Seeders\Delivery;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Class DeliveryServiceSeeder
 * @package Database\Seeders\Deliveries
 */
class DeliveryServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deliveryServices = [
            ['name' => 'La Poste - Colis léger'],
            ['name' => 'La Poste - Colis lourd'],
        ];

        foreach ($deliveryServices as $deliveryService) {
            DB::table('delivery_services')->insert([
                'name' => $deliveryService['name'],
                'slug' => Str::slug($deliveryService['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
