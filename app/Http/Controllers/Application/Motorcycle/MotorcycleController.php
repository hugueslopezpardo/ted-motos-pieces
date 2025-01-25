<?php

namespace App\Http\Controllers\Application\Motorcycle;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\Motorcycle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MotorcycleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param string|null $continent - The continent slug to filter by
     * @param string|null $brand - The brand slug to filter by
     */
    public function index(string $continent = null, string $brand = null): Response
    {
        // Query the products with at least one active item that is not sold out
        $motorcyclesQuery = Motorcycle::where('is_on_sale', true)
            ->whereHas('parts', function ($query) {
                $query->where('is_active', true)
                    ->where('is_sold_out', false);
            });

        // Filter by continent, if provided
        if ($continent) {
            $motorcyclesQuery->whereHas('brand.continent', function ($q) use ($continent) {
                $q->where('slug', $continent);
            });
        }

        // Filter by brand, if provided
        if ($brand) {
            $motorcyclesQuery->whereHas('brand', function ($query) use ($brand) {
                $query->where('slug', $brand);
            });
        }

        // Eager load brand and locationContinent
        $motorcycles = $motorcyclesQuery->with(['brand.continent'])->get();

        foreach ($motorcycles as $motorcycle) {
            $motorcycle->image = $motorcycle->getFullImagePathAttribute();
        }

        return Inertia::render('Application/Motorcycle/Index', [
            'motorcycles' => $motorcycles,
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
