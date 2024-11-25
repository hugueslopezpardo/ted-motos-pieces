<?php

namespace App\Filament\Resources\Delivery\DeliveryServiceRateResource\Pages;

use App\Filament\Resources\Delivery\DeliveryServiceRateResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDeliveryServiceRates extends ListRecords
{
    protected static string $resource = DeliveryServiceRateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
