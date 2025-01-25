<?php

namespace App\Http\Controllers\Application\Policy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TermsOfServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Application/TermsOfService/Index');
    }
}
