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

        // Si une recherche est effectuée
        if ($search_query) {
            $search_query = trim(preg_replace('/\s+/', ' ', $search_query));

            // Recherche des pièces correspondantes au nom
            $parts = MotorcyclePart::where('name', 'like', '%' . $search_query . '%')
                ->with('type', 'type.category', 'quality')
                ->get();

            // Recherche des motos correspondantes au nom
            $motorcycles = Motorcycle::where('name', 'like', '%' . $search_query . '%')
                ->with('parts.type', 'parts.type.category', 'parts.quality') // Précharge les parties des motos avec leur type et qualité
                ->get();

            // Fusionner les pièces de motos dans la recherche
            $motorcycleParts = $motorcycles->flatMap(function ($motorcycle) {
                return $motorcycle->parts; // Extraire toutes les pièces de chaque moto
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
