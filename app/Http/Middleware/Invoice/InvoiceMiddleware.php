<?php

namespace App\Http\Middleware\Invoice;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InvoiceMiddleware
{
    /**
     * Handle an incoming request.
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $order_id = $request->route('order_id');
        if (auth()->check() && (auth()->user()->orders->contains($order_id) || auth()->user()->isAdmin())) {
            return $next($request);
        }
        return response('Unauthorized', 401);
    }
}
