<?php

namespace App\Http\Controllers\Application\Motorcycle;

use App\Http\Controllers\Controller;
use App\Models\Cart\Cart;
use App\Models\Cart\CartItem;
use App\Models\Motorcycle\MotorcyclePart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MotorcyclePartDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param int $motorcycle_part_id - The motorcycle part ID.
     * @return Response
     */
    public function index(int $motorcycle_part_id): Response
    {
        $part = MotorcyclePart::where('id', $motorcycle_part_id)
            ->where('is_active', true)
            ->where('is_sold_out', false)
            ->with([
                'motorcycle.brand',
                'motorcycle.brand.continent',
                'type',
                'quality',
                'deliveryService'
            ])
            ->firstOrFail();

        $part->image = $part->getFullImagesPathAttribute();

        return Inertia::render('Application/MotorcyclePartDetail/Index', [
            'part' => $part,
            'inCartOfTheCurrentUser' => Cart::where('user_id', auth()->id())
                ->whereHas('items', function ($query) use ($motorcycle_part_id) {
                    $query->where('motorcycle_part_id', $motorcycle_part_id);
                })
                ->exists(),
            'inCartOfAnyUser' => CartItem::where('motorcycle_part_id', $motorcycle_part_id)->exists(),
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
