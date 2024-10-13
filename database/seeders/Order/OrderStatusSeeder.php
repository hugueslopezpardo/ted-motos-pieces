<?php

namespace Database\Seeders\Order;

use App\Models\Order\OrderStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'En attente'],
            ['name' => 'En cours de traitement'],
            ['name' => 'Terminé'],
            ['name' => 'Annulé'],
            ['name' => 'Remboursé'],
        ];

        foreach ($statuses as $status) {
            DB::table('order_statuses')->insert([
                'name' => $status['name'],
                'slug' => Str::slug($status['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
