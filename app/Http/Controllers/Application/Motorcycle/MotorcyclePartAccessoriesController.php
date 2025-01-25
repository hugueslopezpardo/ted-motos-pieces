<?php

namespace App\Http\Controllers\Application\Motorcycle;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\Motorcycle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MotorcyclePartAccessoriesController extends Controller
{
    /**
     * Display the specified resource (motorcycle) with its parts.
     * @return Response
     */
    public function index(): Response
    {
        $motorcycle = Motorcycle::where('is_accessoires', true)
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
}
