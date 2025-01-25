<?php

namespace App\Filament\Resources\Location\LocationRegionResource\Pages;

use App\Filament\Resources\Location\LocationRegionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLocationRegion extends EditRecord
{
    protected static string $resource = LocationRegionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
