<?php

namespace App\Filament\Resources\Location\LocationRegionTypeResource\Pages;

use App\Filament\Resources\Location\LocationRegionTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLocationRegionType extends EditRecord
{
    protected static string $resource = LocationRegionTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
