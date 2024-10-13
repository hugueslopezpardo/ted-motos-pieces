<?php

namespace App\Filament\Resources\Motorcycle\MotorcycleBrandResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcycleBrandResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMotorcycleBrand extends EditRecord
{
    protected static string $resource = MotorcycleBrandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
