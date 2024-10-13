<?php

namespace App\Http\Controllers\Application\Motorcycle;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\MotorcyclePart;
use App\Models\Motorcycle\MotorcyclePartCategory;
use App\Models\Motorcycle\MotorcyclePartType;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class MotorcycleSearchController extends Controller
{
    /**
     * Display a listing of the resource.
    * /**
     * Display a listing of the motorcycle parts, with optional filtering by category and type.
     *
     * @param string|null $category The slug of the category to filter by (optional).
     * @param string|null $type The slug of the type to filter by (optional).
     */
    public function index(Request $request, $category = null, $type = null)
    {
        $query = MotorcyclePart::query();

        // Optional filter by type
        if ($type) {
            $query->whereHas('type', function ($query) use ($type) {
                $query->where('slug', $type);
            });
        }

        // Optional filter by category (type.category)
        if ($category) {
            $query->whereHas('type', function ($query) use ($category) {
                $query->whereHas('category', function ($query) use ($category) {
                    $query->where('slug', $category);
                });
            });
        }

        $query->where('is_sold_out', false);
        $query->where('is_active', true);

        // Get the parts, eager loading relationships
        $parts = $query->with(['type', 'type.category', 'quality'])->get();


        foreach ($parts as $part) {
            $part->image = $part->getFullImagesPathAttribute();
        }

        return Inertia::render('Application/MotorcyclePartSearch/Index', [
            'motorcycleParts' => $parts,
            'categories' => MotorcyclePartCategory::all(),
            'types' => MotorcyclePartType::all(),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
