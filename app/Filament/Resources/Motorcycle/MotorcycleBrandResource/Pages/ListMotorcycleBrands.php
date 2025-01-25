<?php

namespace App\Filament\Resources\Motorcycle\MotorcycleBrandResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcycleBrandResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMotorcycleBrands extends ListRecords
{
    protected static string $resource = MotorcycleBrandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
