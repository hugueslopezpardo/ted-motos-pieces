<?php

namespace App\Http\Controllers\Authentication\Register;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authentication\Register\RegisterRequest;
use App\Models\Location\LocationDepartment;
use App\Models\Location\LocationRegion;
use App\Models\Order\OrderDetail;
use App\Models\User\User;
use App\Models\User\UserDetail;
use App\Notifications\Authentication\Register\RegisterNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $regions = LocationRegion::orderBy('name')->get();
        $departments = LocationDepartment::orderBy('name')->get();
        return Inertia::render('Authentication/Register/Index', [
            'departments' => $departments,
            'regions' => $regions,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => ucfirst($request->first_name) . ' ' . strtoupper($request->last_name),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        UserDetail::create([
            'user_id' => $user->id,
            'phone_number' => $request->phone_number,
            'location_region_id' => $request->location_region_id,
            'location_department_id' => $request->location_department_id,
            'postal_code' => $request->postal_code,
            'address' => $request->address,
            'city' => $request->city,
        ]);

        $user->notify(new RegisterNotification(
            name: $user->name,
            email: $user->email,
        ));

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('welcome.index', absolute: false));
    }
}
