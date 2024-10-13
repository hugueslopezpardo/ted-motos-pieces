<?php

namespace App\Http\Controllers\Application\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\Contact\ContactRequest;
use App\Models\User\User;
use App\Notifications\Application\Contact\ContactNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Application/Contact/Index');
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
     * @param ContactRequest $request - Request object
     */
    public function store(ContactRequest $request)
    {
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $message = $request->input('message');
        $name = $first_name . ' ' . $last_name;

        // Get the user where email = "contact@tedmotospieces.fr"
        $user = User::where('email', 'contact@tedmotospieces.fr')->first();

        // Email the user
        $user->notify(new ContactNotification($name, $email, $message));

        return redirect()->route('contact.index')->with('success', 'Votre message a bien été envoyé.');
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
