<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartQualityResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartQualityResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMotorcyclePartQuality extends EditRecord
{
    protected static string $resource = MotorcyclePartQualityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
