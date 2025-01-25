<?php

namespace App\Http\Controllers\Application\Welcome;

use App\Http\Controllers\Controller;
use App\Models\Motorcycle\Motorcycle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trending = Motorcycle::with('brand')
            ->where('is_on_sale', true)
            ->orderBy('created_at', 'desc')->take(3)->get();

        foreach ($trending as $motorcycle) {
            $motorcycle->image = $motorcycle->getFullImagePathAttribute();
        }

        return Inertia::render('Application/Welcome/Index', [
            'trending' => $trending
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
