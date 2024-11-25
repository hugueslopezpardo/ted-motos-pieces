<?php

namespace App\Http\Controllers\Application\Policy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecurePayementController extends Controller
{
    public function index()
    {
        return Inertia::render('Application/SecurePayment/Index');
    }
}
