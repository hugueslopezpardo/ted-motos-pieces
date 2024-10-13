<?php

namespace Database\Seeders\Motorcycle;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MotorcyclePartTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Mécanique' => 1,
            'Électrique' => 2,
            'Accessoire' => 3,
            'Système de carburant' => 4,
            'Transmission' => 5,
            'Système de freinage' => 6,
            'Système de refroidissement' => 7,
            'Système d\'échappement' => 8,
            'Autre' => 9,
        ];

        $parts = [
            $categories['Mécanique'] => [
                ['name' => 'Shifter'],
                ['name' => 'Boîte de vitesses'],
                ['name' => 'Moteur'],
                ['name' => 'Suspension'],
                ['name' => 'Accélérateur'],
                ['name' => 'Arbre à cames'],
                ['name' => 'Piston'],
                ['name' => 'Vilebrequin'],
                ['name' => 'Culasse'],
                ['name' => 'Joints'],
            ],
            $categories['Électrique'] => [
                ['name' => 'Phare'],
                ['name' => 'Faisceau de câbles'],
                ['name' => 'Batterie'],
                ['name' => 'Bobine d\'allumage'],
                ['name' => 'Démarreur'],
                ['name' => 'Régulateur/Redresseur'],
                ['name' => 'Relais de démarreur'],
                ['name' => 'Interrupteur d\'allumage'],
                ['name' => 'Fusibles'],
                ['name' => 'Ampoules'],
            ],
            $categories['Accessoire'] => [
                ['name' => 'Rétroviseur'],
                ['name' => 'Poignées'],
                ['name' => 'Repose-pied'],
                ['name' => 'Pare-brise'],
                ['name' => 'Guidon'],
                ['name' => 'Porte-bagages'],
                ['name' => 'Housse de selle'],
                ['name' => 'Sacoche'],
                ['name' => 'Crash bar'],
            ],
            $categories['Système de carburant'] => [
                ['name' => 'Pompe à carburant'],
                ['name' => 'Injecteur'],
                ['name' => 'Filtre à carburant'],
                ['name' => 'Carburateur'],
                ['name' => 'Réservoir de carburant'],
                ['name' => 'Jauge de carburant'],
            ],
            $categories['Transmission'] => [
                ['name' => 'Embrayage'],
                ['name' => 'Chaîne'],
                ['name' => 'Pignon'],
                ['name' => 'Levier de vitesse'],
                ['name' => 'Courroie de transmission'],
                ['name' => 'Liquide de transmission'],
            ],
            $categories['Système de freinage'] => [
                ['name' => 'Étrier de frein'],
                ['name' => 'Disque de frein'],
                ['name' => 'Durite de frein'],
                ['name' => 'Plaquette de frein'],
                ['name' => 'Maître-cylindre'],
                ['name' => 'Levier de frein'],
            ],
            $categories['Système de refroidissement'] => [
                ['name' => 'Radiateur'],
                ['name' => 'Ventilateur'],
                ['name' => 'Thermostat'],
                ['name' => 'Réservoir de liquide de refroidissement'],
                ['name' => 'Pompe de refroidissement'],
                ['name' => 'Durite'],
            ],
            $categories['Système d\'échappement'] => [
                ['name' => 'Silencieux'],
                ['name' => 'Collecteur'],
                ['name' => 'Tuyau d\'échappement'],
                ['name' => 'Catalyseur'],
                ['name' => 'Collier d\'échappement'],
            ],
            $categories['Autre'] => [
                ['name' => 'Pièce universelle'],
                ['name' => 'Divers'],
                ['name' => 'Pièce personnalisée'],
            ],
        ];

        foreach ($parts as $category => $part) {
            foreach ($part as $item) {
                DB::table('motorcycle_part_types')->insert([
                    'name' => $item['name'],
                    'slug' => Str::slug($item['name']),
                    'motorcycle_part_category_id' => $category,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
