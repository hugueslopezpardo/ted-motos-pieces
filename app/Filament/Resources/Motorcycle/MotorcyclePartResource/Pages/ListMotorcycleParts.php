<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMotorcycleParts extends ListRecords
{
    protected static string $resource = MotorcyclePartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
