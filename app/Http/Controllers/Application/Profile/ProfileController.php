<?php

namespace App\Http\Controllers\Application\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\Profile\ProfileUpdateRequest;
use App\Models\Location\LocationDepartment;
use App\Models\Location\LocationRegion;
use App\Models\Order\Order;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     * @param Request $request - The request object.
     * @return Response - The Inertia response.
     */
    public function index(Request $request): Response
    {
        $regions = LocationRegion::orderBy('name')->get();
        $departments = LocationDepartment::orderBy('name')->get();

        return Inertia::render('Application/Profile/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'regions' => $regions,
            'departments' => $departments,
        ]);
    }

    /**
     * Display the user's orders.
     * @param Request $request - The request object.
     * @return Response - The Inertia response.
     */
    public function orders(Request $request): Response
    {
        $user_id = Auth::id();

        $orders = Order::where('user_id', $user_id)
            ->with('status', 'items', 'items.part', 'items.part.type', 'items.part.quality', 'items.part.quality', 'items.part.motorcycle', 'items.part.motorcycle.brand')
            ->orderBy('created_at', 'desc')
            ->get();

        // Add image to each order item
        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                $item->part->image = $item->part->getFullImagesPathAttribute();
            }
        }

        return Inertia::render('Application/ProfileOrder/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Update the user's profile information.
     * @param ProfileUpdateRequest $request - The update request.
     * @return RedirectResponse - The redirect response.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $user = Auth::user();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        if ($user->details) {
            $user->details->phone_number = $request->phone_number;
            $user->details->location_region_id = $request->location_region_id;
            $user->details->location_department_id = $request->location_department_id;
            $user->details->postal_code = $request->postal_code;
            $user->details->address = $request->address;
            $user->details->city = $request->city;
            $user->details->save();
        } else {
            $user->details()->create([
                'phone_number' => $request->phone_number,
                'location_region_id' => $request->location_region_id,
                'location_department_id' => $request->location_department_id,
                'postal_code' => $request->postal_code,
                'address' => $request->address,
                'city' => $request->city,
            ]);
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.index');
    }

    /**
     * Delete the user's account.
     * @param Request $request - The request object.
     * @return RedirectResponse - The redirect response.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

}
