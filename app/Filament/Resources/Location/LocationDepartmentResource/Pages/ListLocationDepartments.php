<?php

namespace App\Filament\Resources\Location\LocationDepartmentResource\Pages;

use App\Filament\Resources\Location\LocationDepartmentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLocationDepartments extends ListRecords
{
    protected static string $resource = LocationDepartmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
