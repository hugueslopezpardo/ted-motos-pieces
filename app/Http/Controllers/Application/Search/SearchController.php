<?php

namespace App\Http\Controllers\Application\Search;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\Search\SearchRequest;
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
    public function index(SearchRequest $request): \Inertia\Response
    {
        $search_query = $request->input('search_query');

        $motorcycles = Motorcycle::query()->where('is_on_sale', 'true')->with(['parts' => function ($query) use ($search_query) {

            $query->where('is_sold_out', 0)
                ->where('is_active', 1);

            if ($search_query) {
                $search_terms = explode(' ', strtolower($search_query));

                $query->where(function ($q) use ($search_terms) {
                    foreach ($search_terms as $term) {
                        $q->orWhereRaw('LOWER(name) LIKE ?', ["%$term%"]);
                    }
                });
            }
        }]);

        if ($search_query) {
            $search_terms = explode(' ', strtolower($search_query));

            $motorcycles->where(function ($query) use ($search_terms) {
                foreach ($search_terms as $term) {
                    $query->orWhereRaw('LOWER(name) LIKE ?', ["%$term%"]);
                }
            });
        }

        $motorcycles = $motorcycles->get();

        // Check the number of motorcycles found
        $count = $motorcycles->count();


        // On compte le nombre de motos trouvées
        if ($count > 0) {
            foreach ($motorcycles as $motorcycle) {
                if ($motorcycle->parts->isEmpty()) {
                    // Charger toutes les pièces de cette moto si aucune pièce trouvée
                    $motorcycle->load('parts');
                }
            }
        } else {
            // Récupérer toutes les pièces de chaque moto pouvant correspondre à la recherche
            $parts = MotorcyclePart::query()->where('is_sold_out', 0)
                ->where('is_active', 1)
                ->where(function ($query) use ($search_query) {
                    if ($search_query) {
                        $search_terms = explode(' ', strtolower($search_query));

                        $query->where(function ($q) use ($search_terms) {
                            foreach ($search_terms as $term) {
                                $q->orWhereRaw('LOWER(name) LIKE ?', ["%$term%"]);
                            }
                        });
                    }
                })->get();


            foreach ($parts as $part) {
                $part->image = $part->getFullImagesPathAttribute();
            }

            return Inertia::render('Application/MotorcycleSearch/Index', [
                'motorcycleParts' => $parts->toArray(),
            ]);

        }

        foreach ($motorcycles as $motorcycle) {
            foreach ($motorcycle->parts as $part) {
                $part->image = $part->getFullImagesPathAttribute();
            }
        }

        $parts = [];

        foreach ($motorcycles as $motorcycle) {
            $parts[] = $motorcycle->parts;
        }

        $parts = collect($parts)->flatten();

        return Inertia::render('Application/MotorcycleSearch/Index', [
            'motorcycleParts' => $parts->toArray(),
        ]);
    }

    public function redirect(Request $request): RedirectResponse
    {


        return redirect()->route('welcome.index');
    }

}
