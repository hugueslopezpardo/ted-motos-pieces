<?php

namespace Database\Seeders\Motorcycle;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MotorcyclePartCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Mécanique'],
            ['name' => 'Électrique'],
            ['name' => 'Accessoire'],
            ['name' => 'Système de carburant'],
            ['name' => 'Transmission'],
            ['name' => 'Système de freinage'],
            ['name' => 'Système de refroidissement'],
            ['name' => 'Système d\'échappement'],
            ['name' => 'Autre'],
            ['name' => 'Inconnu']
        ];

        foreach ($categories as $category) {
            DB::table('motorcycle_part_categories')->insert([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
