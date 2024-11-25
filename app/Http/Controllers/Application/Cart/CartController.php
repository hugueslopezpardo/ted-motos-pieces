<?php

namespace App\Http\Controllers\Application\Cart;

use App\Http\Controllers\Controller;
use App\Models\Cart\Cart;
use App\Models\Delivery\DeliveryServiceRate;
use App\Models\Location\LocationDepartment;
use App\Models\Location\LocationRegion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

/**
 * The CartController class.
 * @package App\Http\Controllers\Application\Cart
 */
class CartController extends Controller
{
    /**
     * Display the cart.
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // Get all the products in the user's cart
        $cart = Cart::where('user_id', $request->user()->id)
            ->with('items', 'items.part', 'items.part.quality', 'items.part.type')
            ->first();

        if (!$cart) {
            return Inertia::render('Application/Cart/Index', [
                'cart' => [
                    'items' => [],
                ],
                'total' => 0,
                'deliveryServiceRates' => DeliveryServiceRate::with('deliveryService', 'regionType')->get(),
                'regions' => LocationRegion::with('type')->get(),
                'departments' => LocationDepartment::with('region')->get(),
            ]);
        }

        // For each item add the image URL
        foreach ($cart->items as $item) {
            $item->part->image = $item->part->getFullImagesPathAttribute();
        }

        $is_heavy = $cart->items->contains('part.is_heavy', true);
        $regions = LocationRegion::with('type')->get();
        $departments = LocationDepartment::with('region')->get();

        if ($is_heavy) {
            $regions = $regions->filter(function ($region) {
                return $region->type->id == 1;
            });
            $departments = $departments->filter(function ($department) {
                return $department->region->type->id == 1;
            });
        }

        return Inertia::render('Application/Cart/Index', [
            'cart' => $cart,
            'total' => $cart->items->sum('part.price'),
            'deliveryServiceRates' => DeliveryServiceRate::with('deliveryService', 'regionType')->get(),
            'regions' => $regions,
            'departments' => $departments,
        ]);
    }

    /**
     * Add an item to the cart.
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $user_id = $request->user()->id;
        $motorcycle_part_id = $request->input('motorcycle_part_id');

        // Check if a cart exists for the user
        // If not, create a new cart
        $cart = Cart::where('user_id', $user_id)->first();

        // Generate UUID if cart doesn't exist
        if (!$cart) {
            $cart = Cart::create([
                'user_id' => $user_id,
                'token' => Str::uuid(),
            ]);
            $cart->save();
        }

        // If the product is already in the cart, redirect to the cart view
        if ($cart->items()->where('motorcycle_part_id', $motorcycle_part_id)->exists()) {
            return redirect()->route('cart.index');
        }

        // Add the product to the cart
        $cart->items()->create([
            'motorcycle_part_id' => $motorcycle_part_id,
        ]);

        return redirect()->route('cart.index');
    }

    /**
     * Display the specified resource (cart).
     * @param string $id
     * @return Response
     */
    public function show(string $id): Response
    {
        // This method can be used for showing the cart for a specific ID if necessary.
        return Inertia::render('Application/Cart/Index', [
            'cart' => Cart::with('items', 'items.part', 'items.part.quality', 'items.part.type')->findOrFail($id)
        ]);
    }

    /**
     * Edit the cart (not typically needed but kept for future expansion).
     * @param string $id
     */
    public function edit(string $id)
    {
        // This could be used for editing cart details if needed.
    }

    /**
     * Update the specified cart item in the cart.
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        // Update cart logic can be implemented here
        return redirect()->route('cart.index');
    }

    /**
     * Remove an item from the cart.
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user_id = $request->user()->id;
        $motorcycle_part_id = $request->input('motorcycle_part_id');

        // Get the cart for the user
        $cart = Cart::where('user_id', $user_id)->first();

        // Check if the cart exists
        if (!$cart) {
            return redirect()->route('cart.index');
        }

        // Remove the product from the cart
        $cart->items()->where('motorcycle_part_id', $motorcycle_part_id)->delete();

        return redirect()->route('cart.index');
    }

    /**
     * Clear the cart.
     * @param Request $request
     * @return RedirectResponse
     */
    public function clear(Request $request): RedirectResponse
    {
        $user_id = $request->user()->id;

        // Get the cart for the user
        $cart = Cart::where('user_id', $user_id)->first();

        // Check if the cart exists
        if (!$cart) {
            return redirect()->route('cart.index');
        }

        // Clear the cart
        $cart->items()->delete();

        return redirect()->route('cart.index');
    }
}
