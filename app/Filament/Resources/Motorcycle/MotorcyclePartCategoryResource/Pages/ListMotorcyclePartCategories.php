<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartCategoryResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMotorcyclePartCategories extends ListRecords
{
    protected static string $resource = MotorcyclePartCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
