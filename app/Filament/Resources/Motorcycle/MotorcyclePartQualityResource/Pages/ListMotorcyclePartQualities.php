<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartQualityResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartQualityResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMotorcyclePartQualities extends ListRecords
{
    protected static string $resource = MotorcyclePartQualityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
