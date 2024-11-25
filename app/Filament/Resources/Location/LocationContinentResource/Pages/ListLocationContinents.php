<?php

namespace App\Filament\Resources\Location\LocationContinentResource\Pages;

use App\Filament\Resources\Location\LocationContinentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLocationContinents extends ListRecords
{
    protected static string $resource = LocationContinentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
