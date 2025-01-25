<?php

namespace App\Filament\Resources\Location\LocationRegionResource\Pages;

use App\Filament\Resources\Location\LocationRegionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLocationRegions extends ListRecords
{
    protected static string $resource = LocationRegionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
