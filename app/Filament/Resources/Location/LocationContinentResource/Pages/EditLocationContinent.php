<?php

namespace App\Filament\Resources\Location\LocationContinentResource\Pages;

use App\Filament\Resources\Location\LocationContinentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLocationContinent extends EditRecord
{
    protected static string $resource = LocationContinentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
