<?php

namespace Database\Seeders\Motorcycle;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MotorcyclePartQualitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $qualities = [
            ['name' => 'Neuf'],
            ['name' => 'Occasion'],
            ['name' => 'Remis à neuf'],
            ['name' => 'Défectueux'],
            ['name' => 'Endommagé'],
            ['name' => 'Cassé'],
            ['name' => 'En l\'état']
        ];

        foreach ($qualities as $quality) {
            DB::table('motorcycle_part_qualities')->insert([
                'name' => $quality['name'],
                'slug' => Str::slug($quality['name']),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
