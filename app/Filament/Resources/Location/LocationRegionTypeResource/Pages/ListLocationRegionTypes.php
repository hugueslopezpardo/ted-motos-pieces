<?php

namespace App\Filament\Resources\Location\LocationRegionTypeResource\Pages;

use App\Filament\Resources\Location\LocationRegionTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLocationRegionTypes extends ListRecords
{
    protected static string $resource = LocationRegionTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
