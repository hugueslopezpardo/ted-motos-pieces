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
        // Get input subcategory
        $subcategory = $request->input('subcategory');
        $parts = MotorcyclePart::query();
        $parts = [];

        if ($subcategory) {
            $subcategory_id = MotorcyclePartType::where('slug', $subcategory)->first()->id;

            // Get all the motorcycle parts where the motorcycle_part_type_id is equal to the subcategory id
            $parts = MotorcyclePart::where('motorcycle_part_type_id', $subcategory_id)
                ->where('is_sold_out', false)
                ->with('type', 'type.category', 'quality')
                ->get();

            // Get all the part where type.category.slug is equal to the category
            $parts = $parts->filter(function ($part) use ($category) {
                return $part->type->category->slug === $category;
            });

        } else {
            // Get all the parts where the type.category.slug is equal to the category
            $parts = MotorcyclePart::whereHas('type.category', function ($query) use ($category) {
                $query->where('slug', $category);
            })
                ->where('is_sold_out', false)
                ->with('type', 'type.category', 'quality')
                ->get();
        }

        if (is_null($category)) {
            $parts = MotorcyclePart::where('is_sold_out', false)
                ->with('type', 'type.category', 'quality')
                ->get();
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
