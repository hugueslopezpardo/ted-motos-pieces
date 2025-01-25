<?php

namespace App\Filament\Resources\User\UserDetailResource\Pages;

use App\Filament\Resources\User\UserDetailResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUserDetail extends CreateRecord
{
    protected static string $resource = UserDetailResource::class;
}
