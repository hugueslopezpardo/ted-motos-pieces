<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Invoice\InvoiceMiddleware;
use App\Http\Middleware\Invoice\InvoicesMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'invoice' => InvoiceMiddleware::class,
            'invoices' => InvoicesMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Si il y'a une erreur 404
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            // Si il s'agit d'une erreur 404
            if ($exception instanceof NotFoundHttpException) {
                return Inertia::render('Application/Errors/404/Index');
            }
            return $response;
        });
    })->create();
