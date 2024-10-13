<?php

namespace App\Filament\Resources\Motorcycle\MotorcyclePartTypeResource\Pages;

use App\Filament\Resources\Motorcycle\MotorcyclePartTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMotorcyclePartType extends EditRecord
{
    protected static string $resource = MotorcyclePartTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
