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
        $validated = $request->validate([
            'search_query' => 'nullable|string|max:255'
        ]);

        $search_query = $validated['search_query'] ?? null;

        if ($search_query) {
            $search_query = trim(preg_replace('/\s+/', ' ', $search_query));
            $parts = MotorcyclePart::where('name', 'like', '%' . $search_query . '%')
                ->with('type', 'type.category', 'quality')
                ->get();


            $motorcycle = Motorcycle::where('name', 'like', '%' . $search_query . '%')
                ->with('parts')
                ->get();

            // Get the parts of the motorcycle
            $motorcycle->map(function ($motorcycle) {
                $motorcycle->parts = $motorcycle->parts()->with('type', 'type.category', 'quality')->get();
            });

            // Combine the two collections
            $parts = $parts->concat($motorcycle->pluck('parts')->flatten());
        } else {
            $parts = MotorcyclePart::all();
        }

        // Add all images to the parts
        $parts->map(function ($part) {
            $part->image = $part->getFullImagesPathAttribute();
        });

        return Inertia::render('Application/MotorcyclePartSearch/Index', [
            'motorcycleParts' => $parts,
            'categories' => MotorcyclePartCategory::all(),
            'types' => MotorcyclePartType::all(),
        ]);
    }

    public function redirect(Request $request): RedirectResponse
    {


        return redirect()->route('welcome.index');
    }

}
