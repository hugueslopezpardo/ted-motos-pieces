<?php

namespace App\Http\Controllers\Application\Search;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\Motorcycle;
use App\Models\Motorcycle\MotorcyclePart;
use App\Models\Motorcycle\MotorcyclePartCategory;
use App\Models\Motorcycle\MotorcyclePartType;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class SearchController
 * @package App\Http\Controllers\Application\Search
 */
class SearchController extends Controller
{
    /**
     * Display the search page.
     * @param Request $request - The request object.
     * @return Response
     */
    public function index(Request $request): \Inertia\Response
    {
        // Validation de la requête
        $validated = $request->validate([
            'search_query' => 'nullable|string|max:255',
        ]);

        // Récupérer la requête de recherche
        $search_query = $validated['search_query'] ?? null;

        // Initialiser les variables de résultat
        $parts = collect();
        $motorcycles = collect();

        // Fonction pour enlever les accents et convertir en minuscules
        $normalize = function($string) {
            // Supprimer les accents et convertir en minuscules
            return strtolower(
                preg_replace(
                    '/[áàâãäåæ]/u', 'a',
                    preg_replace(
                        '/[éèêë]/u', 'e',
                        preg_replace(
                            '/[íìîï]/u', 'i',
                            preg_replace(
                                '/[óòôõö]/u', 'o',
                                preg_replace(
                                    '/[úùûü]/u', 'u',
                                    preg_replace(
                                        '/[ç]/u', 'c',
                                        preg_replace(
                                            '/[ñ]/u', 'n',
                                            preg_replace(
                                                '/[ýÿ]/u', 'y',
                                                $string
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        };

        // Si une recherche est effectuée
        if ($search_query) {
            $search_query = trim(preg_replace('/\s+/', ' ', $search_query));

            // Normaliser la requête de recherche (enlever les accents et mettre en minuscules)
            $normalizedSearchQuery = $normalize($search_query);

            // Recherche des pièces dont le nom correspond (sans accents et en minuscules)
            $parts = MotorcyclePart::whereRaw("LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(name, 'á', 'a'), 'à', 'a'), 'é', 'e'), 'è', 'e'), 'ó', 'o'), 'ç', 'c')) LIKE ?", ["%$normalizedSearchQuery%"])
                ->with('type', 'type.category', 'quality')
                ->get();

            // Recherche des motos dont le nom correspond (sans accents et en minuscules)
            $motorcycles = Motorcycle::whereRaw("LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(name, 'á', 'a'), 'à', 'a'), 'é', 'e'), 'è', 'e'), 'ó', 'o'), 'ç', 'c')) LIKE ?", ["%$normalizedSearchQuery%"])
                ->with('parts.type', 'parts.type.category', 'parts.quality') // Précharge les pièces de chaque moto
                ->get();

            dd($motorcycles->toArray());

            // Fusionner les pièces de motos associées dans la recherche
            $motorcycleParts = $motorcycles->flatMap(function ($motorcycle) {
                return $motorcycle->parts; // Récupère toutes les pièces de la moto
            });

            // Ajouter ces pièces à la collection des pièces
            $parts = $parts->concat($motorcycleParts)->unique('id');
        } else {
            // Si aucune recherche, récupérer toutes les pièces
            $parts = MotorcyclePart::with('type', 'type.category', 'quality')->get();
        }

        // Ajouter les images aux pièces
        $parts->map(function ($part) {
            $part->image = $part->getFullImagesPathAttribute();
        });

        // Récupérer les catégories et types pour le filtrage
        $categories = MotorcyclePartCategory::all();
        $types = MotorcyclePartType::all();

        return Inertia::render('Application/MotorcyclePartSearch/Index', [
            'motorcycleParts' => $parts,
            'categories' => $categories,
            'types' => $types,
        ]);
    }

    public function redirect(Request $request): RedirectResponse
    {


        return redirect()->route('welcome.index');
    }

}
