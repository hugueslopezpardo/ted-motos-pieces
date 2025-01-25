<?php

use App\Http\Controllers\Application\About\AboutController;
use App\Http\Controllers\Application\Cart\CartController;
use App\Http\Controllers\Application\Checkout\CheckoutController;
use App\Http\Controllers\Application\Contact\ContactController;
use App\Http\Controllers\Application\Invoice\InvoiceController;
use App\Http\Controllers\Application\Motorcycle\MotorcycleController;
use App\Http\Controllers\Application\Motorcycle\MotorcyclePartAccessoriesController;
use App\Http\Controllers\Application\Motorcycle\MotorcyclePartController;
use App\Http\Controllers\Application\Motorcycle\MotorcyclePartDetailController;
use App\Http\Controllers\Application\Motorcycle\MotorcycleSearchController;
use App\Http\Controllers\Application\Policy\DeliveryPolicyController;
use App\Http\Controllers\Application\Policy\LegalNoticeController;
use App\Http\Controllers\Application\Policy\PrivacyPolicyController;
use App\Http\Controllers\Application\Policy\RefundPolicyController;
use App\Http\Controllers\Application\Policy\SecurePayementController;
use App\Http\Controllers\Application\Policy\TermsOfServiceController;
use App\Http\Controllers\Application\Profile\ProfileController;
use App\Http\Controllers\Application\Welcome\WelcomeController;
use Illuminate\Support\Facades\Route;

// Routes

Route::get('/', [WelcomeController::class, 'index'])
    ->name('welcome.index');

Route::get('/about', [AboutController::class, 'index'])
    ->name('about.index');

Route::get('/contact', [ContactController::class, 'index'])
    ->name('contact.index');

Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.store');

Route::prefix('motorcycles')->group(function () {

    Route::get('/all/{continent?}/{brand?}', [MotorcycleController::class, 'index'])
        ->name('motorcycles.index');

    Route::get('/parts/{motorcycle_id}', [MotorcyclePartController::class, 'index'])
        ->name('motorcycles.part.index');

    Route::get('/part/{motorcycle_part_id}', [MotorcyclePartDetailController::class, 'index'])
        ->name('motorcycles.part.detail.index');

    Route::get('/search/{category?}/{type?}', [MotorcycleSearchController::class, 'index'])
        ->name('motorcycles.search');

    Route::get('/accessories', [MotorcyclePartAccessoriesController::class, 'index'])
        ->name('motorcycles.accessories');

});

Route::get('/terms-of-service', [TermsOfServiceController::class, 'index'])
    ->name('terms-of-service.index');
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index'])
    ->name('privacy-policy.index');
Route::get('/secure-payment', [SecurePayementController::class, 'index'])
    ->name('secure-payment.index');
Route::get('/legal-notice', [LegalNoticeController::class, 'index'])
    ->name('legal-notice.index');
Route::get('/delivery', [DeliveryPolicyController::class, 'index'])
    ->name('delivery.index');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {

    Route::prefix('cart')->group(function () {

        Route::get('/', [CartController::class, 'index'])
            ->name('cart.index');

        Route::post('/add', [CartController::class, 'store'])
            ->name('cart.add');

        Route::post('/remove', [CartController::class, 'destroy'])
            ->name('cart.remove');

        Route::post('/clear', [CartController::class, 'clear'])
            ->name('cart.clear');
    });


    Route::prefix('invoices')->group(function () {

        Route::get('/detail/{order_id}', [InvoiceController::class, 'invoice'])
            ->name('invoice.invoice')
            ->middleware('invoice');

        Route::get('/details/{start_date?}/{end_date?}', [InvoiceController::class, 'invoices'])
            ->name('invoice.invoices')
            ->middleware('invoices');

    });

    Route::prefix('profile')->group(function () {

        Route::get('/', [ProfileController::class, 'index'])
            ->name('profile.index');

        Route::get('/orders', [ProfileController::class, 'orders'])
            ->name('profile.orders');

        Route::patch('/update', [ProfileController::class, 'update'])
            ->name('profile.update');

        Route::delete('/destroy', [ProfileController::class, 'destroy'])
            ->name('profile.destroy');

    });

    Route::prefix('checkout')->group(function () {

        Route::post('/', [CheckoutController::class, 'process'])
            ->name('checkout.process');

        Route::get('/success', [CheckoutController::class, 'success'])
            ->name('checkout.success');

        Route::get('/cancel', [CheckoutController::class, 'cancel'])
            ->name('checkout.cancel');

    });

});

// http://localhost:8000/motorcycles/all/asie/honda

require __DIR__.'/auth.php';
