<?php

namespace App\Http\Controllers\Application\Motorcycle;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\Motorcycle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MotorcyclePartController extends Controller
{
    /**
     * Display the specified resource (motorcycle) with its parts.
     * @param int $motorcycle_id - The motorcycle ID.
     * @return Response
     */
    public function index(int $motorcycle_id): Response
    {
        $motorcycle = Motorcycle::where('id', $motorcycle_id)
            ->with([
                'parts' => function ($query) {
                    $query->where('is_active', true)
                        ->where('is_sold_out', false);
                },
                'parts.type', 'parts.quality',
                'brand', 'brand.continent'
            ])
            ->first();

        // For each part, add the full image path
        foreach ($motorcycle->parts as $part) {
            $part->image = $part->getFullImagesPathAttribute();
        }

        return Inertia::render('Application/MotorcyclePart/Index', [
            'motorcycle' => $motorcycle
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
