<?php

namespace App\Http\Controllers\Application\Invoice;

use App\Http\Controllers\Controller;
use App\Models\Order\Order;
use App\Models\Order\OrderDetail;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Response;
use LaravelDaily\Invoices\Classes\Buyer;
use LaravelDaily\Invoices\Classes\InvoiceItem;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Invoice;
use ZipArchive;

/**
 * The invoices' controller.
 * @package App\Http\Controllers\Application\Invoices
 */
class InvoiceController extends Controller
{
    /**
     * Information about the company.
     * @var Party
     */
    private $company;

    /**
     * Construct the invoices' controller.
     */
    public function __construct()
    {
        $this->company = new Party([
            'name' => 'Ted Motos Pieces',
            'custom_fields' => [
                'Siret' => '980588503 00014',
                'Adresse' => '8b chemin de la croix nicolas',
                'Code Postal' => '14190',
                'Ville' => 'Maizières',
            ],
        ]);
    }

    /**
     * Display the invoice for the given order.
     * @param int $order_id - The order's ID.
     * @return Response
     * @throws Exception
     */
    public function invoice($order_id): Response
    {
        // Get the order
        $order = Order::with('items', 'items.part')
            ->findOrFail($order_id);

        // Get order date
        $order_date = $order->created_at;

        $delivery_service = $order->delivery_service;

        // Get the order details
        $detail = OrderDetail::where('order_id', $order_id)->get()->first();

        $postal_code = $detail->postal_code;
        $city = $detail->city;
        $address = $detail->address;

        $items = [];

        // Get the delivery rate
        $delivery_price = $order->delivery_price;

        dd($order->items->toArray());

        foreach ($order->items as $item) {
            // Get The iD of the part
            $name = "Réf: #" . $item->part->id . ' - ' . $item->part->motorcycle->name . ' - ' . $item->part->type->name . ' - ' . $item->part->name . ' - ' . $item->part->quality->name;
            $price = $item->part->price;
            $quantity = 1;
            $item = InvoiceItem::make($name)
                ->pricePerUnit($price)
                ->quantity($quantity);
            $items[] = $item;
        }

        // Add the delivery rate to the total as a new item
        $item = InvoiceItem::make('Frais de livraison')
            ->pricePerUnit($delivery_price)
            ->quantity(1);

        // Add delivery rate to the total
        $items[] = $item;

        $invoice = Invoice::make()
            ->series('INV')
            ->sequence(667)
            ->serialNumberFormat($order->reference)
            ->seller($this->company)
            ->buyer(new Buyer([
                'name' => $order->user->name,
                'custom_fields' => [
                    'Email' => $order->user->email,
                    'Téléphone' => $order->user->details->phone_number,
                    'Adresse' => $order->user->details->address,
                    'Code Postal' => $order->user->details->postal_code,
                    'Ville' => $order->user->details->city,
                ],
            ]))
            ->payUntilDays(0)
            ->date(now())
            ->payUntilDays(0)
            ->date($order_date)
            ->dateFormat('d/m/Y')
            ->currencySymbol('€')
            ->currencyCode('EUR')
            ->currencyThousandsSeparator('.')
            ->currencyDecimalPoint(',')
            ->filename($order->reference)
            ->addItems($items)
            ->notes( $delivery_service . ', ' . $address . ', ' . $postal_code . ' ' . $city . '<br /> <br /> TVA non applicable article 293 B du CGI.') # Notes before table
            ->logo(public_path('assets/images/shared/logos/logo-transparent.png'));

        return $invoice->stream();

    }

    /**
     * Display the invoices for the given period.
     * @param string|null $start_date - The start date.
     * @param string|null $end_date - The end date.
     * @throws BindingResolutionException
     * @throws Exception
     */
    public function invoices(string $start_date = null, string $end_date = null)
    {
        if (!$start_date || !$end_date) {
            $invoices = Order::all();
        } else {
            $invoices = Order::whereBetween('created_at', [$start_date, $end_date])->get();
        }

        $zipFile = storage_path('app/invoices.zip');

        $zip = new ZipArchive();
        if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new Exception('Impossible de créer le fichier ZIP');
        }

        foreach ($invoices as $invoice) {
            $items = [];
            foreach ($invoice->items as $item) {
                $name = $item->part->name;
                $price = $item->part->price;
                $quantity = 1;
                $item = InvoiceItem::make($name)
                    ->pricePerUnit($price)
                    ->quantity($quantity);
                $items[] = $item;
            }

            // add the delivery rate to the total as a new item
            $item = InvoiceItem::make('Frais de livraison')
                ->pricePerUnit($invoice->delivery_price)
                ->quantity(1);

            // add delivery rate to the total
            $items[] = $item;

            $file_name = 'date='.$invoice->created_at->format('Y-m-d') . '_reference=' . $invoice->reference;

            Invoice::make()
                ->series('INV')
                ->sequence(667)
                ->serialNumberFormat($invoice->reference)
                ->seller($this->company)
                ->buyer(new Buyer([
                    'name' => $invoice->user->name,
                    'custom_fields' => [
                        'email' => $invoice->user->email,
                    ],
                ]))
                ->payUntilDays(0)
                ->date(now())
                ->dateFormat('m/d/Y')
                ->currencySymbol('€')
                ->currencyCode('EUR')
                ->currencyThousandsSeparator('.')
                ->currencyDecimalPoint(',')
                ->filename($file_name)
                ->addItems($items)
                ->logo(public_path('assets/images/shared/logos/logo-transparent.png'))
                ->save('public');

            $file = public_path('storage/' . $file_name . '.pdf');

            $zip->addFile($file, $file_name . '.pdf');

        }

        $zip->close();

        $files = glob(public_path('storage/*.pdf'));

        foreach ($files as $file) {
            unlink($file);
        }

        return response()->download($zipFile, 'invoices.zip', [
            'Content-Type' => 'application/zip',
        ])->deleteFileAfterSend(true);

    }

}
