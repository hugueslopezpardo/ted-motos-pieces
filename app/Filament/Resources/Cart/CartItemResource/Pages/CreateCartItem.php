<?php

namespace App\Filament\Resources\Cart\CartItemResource\Pages;

use App\Filament\Resources\Cart\CartItemResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCartItem extends CreateRecord
{
    protected static string $resource = CartItemResource::class;
}
