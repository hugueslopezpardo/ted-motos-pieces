<?php

namespace App\Http\Controllers\Application\Checkout;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\Checkout\CheckoutRequest;
use App\Models\Cart\Cart;
use App\Models\Order\Order;
use App\Models\Order\OrderDetail;
use App\Notifications\Application\Checkout\CheckoutFailedNotification;
use App\Notifications\Application\Checkout\CheckoutSuccessNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;

/**
 * The CheckoutController class.
 * @package App\Http\Controllers\Application\Checkout
 */
class CheckoutController extends Controller
{
    /**
     * Process the checkout.
     * @param CheckoutRequest $request - The incoming request.
     * @return RedirectResponse
     * @throws ApiErrorException
     */
    public function process(CheckoutRequest $request)
    {

        $cart = Cart::where('user_id', Auth::user()->id)
            ->with('items', 'items.part', 'items.part.quality', 'items.part.type')
            ->first();

        $cart_token = $cart->token;

        $region = $request->region;
        $department = $request->department;
        $city = $request->city;
        $address = $request->address;
        $postal_code = $request->postal_code;
        $delivery_price = $request->delivery_price;
        $delivery_service = $request->delivery_service;

        $line_items = [];

        foreach ($cart->items as $item) {
            $line_items[] = [
                'price_data' => [
                    'currency'     => 'eur',
                    'product_data' => [
                        'name'  => $item->part->name,
                    ],
                    'unit_amount'  => $item->part->price * 100, // Price in cents
                ],
                'quantity'   => 1,
            ];
        }

        // Add shipping cost as an additional line item
        $line_items[] = [
            'price_data' => [
                'currency'     => 'eur',
                'product_data' => [
                    'name'  => 'Frais de port',
                ],
                'unit_amount'  => $request->delivery_price * 100, // Shipping price in cents
            ],
            'quantity'   => 1,
        ];

        // Build the success URL with encoded parameters
        $success_url = route('checkout.success') . '?' . http_build_query([
                'session_id'  => '{CHECKOUT_SESSION_ID}',
                'cart_token'  => $cart_token,
                'region'      => $region,
                'department'  => $department,
                'city'        => $city,
                'address'     => $address,
                'postal_code' => $postal_code,
                'delivery_price' => $delivery_price,
                'delivery_service' => $delivery_service,
            ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'line_items' => $line_items,
            'customer_email' => auth()->user()->email,
            'payment_method_types' => ['card', 'klarna'],
            'mode' => 'payment',
            'success_url' => $success_url,
            'cancel_url' => route('cart.index'),
        ]);

        return redirect()->away($session->url);
    }

    /**
     * Display the checkout success page.
     * @param Request $request - The incoming request.
     * @return RedirectResponse
     */
    public function success(Request $request)
    {
        if (!$request->session_id || !$request->cart_token) {
            return redirect()->route('cart.index');
        }

        $cart = Cart::where('token', $request->cart_token)
            ->with('items', 'items.part', 'items.part.quality', 'items.part.type')
            ->first();

        if (!$cart) {
            return redirect()->route('cart.index');
        }

        // Extracting order details from the request
        $region      = $request->region;
        $department  = $request->department;
        $city        = $request->city;
        $address     = $request->address;
        $postal_code = $request->postal_code;
        $delivery_price = $request->delivery_price;
        $delivery_service = $request->delivery_service;

        // Create the order
        $order = Order::create([
            'reference' => 'ORD' . time() . 'U' . Auth::user()->id . 'C' . $cart->id,
            'total'     => $cart->items->sum('part.price'),
            'delivery_price' => $delivery_price,
            'delivery_service' => $delivery_service == 1 ? 'La Poste' : 'Mondial Relay',
            'user_id'   => Auth::user()->id,
            'order_status_id' => 1,
        ]);

        // Create order detail with delivery information
        OrderDetail::create([
            'order_id'    => $order->id,
            'region'      => $region,
            'department'  => $department,
            'postal_code' => $postal_code,
            'city'        => $city,
            'address'     => $address,
        ]);

        // Add order items from the cart
        foreach ($cart->items as $item) {
            $order->items()->create([
                'order_id' => $order->id,
                'motorcycle_part_id' => $item->part->id,
            ]);
        }

        // Mark the items as sold out
        foreach ($cart->items as $item) {
            $item->part->is_sold_out = true;
            $item->part->save();
        }

        // Clear the cart after checkout
        Cart::where('token', $request->cart_token)->delete();

        // Get the user
        $user = Auth::user();

        // Send the order confirmation email
        $user->notify(new CheckoutSuccessNotification());

        return redirect()->route('profile.orders');
    }

    /**
     * Display the checkout error page.
     * @param Request $request - The incoming request.
     * @return RedirectResponse
     */
    public function cancel(Request $request)
    {
        // Get the user
        $user = Auth::user();

        // Send the checkout failed email
        $user->notify(new CheckoutFailedNotification());

        return redirect()->route('checkout.cancel');
    }
}
