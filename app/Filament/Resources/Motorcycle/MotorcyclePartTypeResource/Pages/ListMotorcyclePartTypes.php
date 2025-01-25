<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartTypeResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMotorcyclePartTypes extends ListRecords
{
    protected static string $resource = MotorcyclePartTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
