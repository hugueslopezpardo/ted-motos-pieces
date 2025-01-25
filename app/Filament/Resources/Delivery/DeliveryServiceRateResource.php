<?php

namespace App\Filament\Resources\Delivery;

use App\Filament\Resources\Delivery\DeliveryServiceRateResource\Pages;
use App\Filament\Resources\Delivery\DeliveryServiceRateResource\RelationManagers;
use App\Models\Delivery\DeliveryServiceRate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DeliveryServiceRateResource extends Resource
{
    protected static ?string $model = DeliveryServiceRate::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-euro';

    protected static ?string $navigationGroup = 'Livraison';

    protected static ?string $navigationLabel = 'Tarifs';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('min_weight')
                    ->label('Poids minimum (kg)')
                    ->minValue(0)
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('max_weight')
                    ->label('Poids maximum (kg)')
                    ->maxValue(30)
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('rate')
                    ->label('Tarif')
                    ->required()
                    ->numeric(),
                Forms\Components\Select::make('delivery_service_id')
                    ->label('Service de livraison')
                    ->relationship('deliveryService', 'name')
                    ->required(),
                Forms\Components\TextInput::make('location_region_type_id')
                    ->label('Type de région')
                    ->required()
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('min_weight')
                    ->label('Poids minimum (kg)')
                    ->suffix(' kg')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('max_weight')
                    ->label('Poids maximum (kg)')
                    ->suffix(' kg')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('rate')
                    ->label('Tarif')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('deliveryService.name')
                    ->label('Service de livraison')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('regionType.name')
                    ->label('Type de région')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Modifié le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDeliveryServiceRates::route('/'),
            'create' => Pages\CreateDeliveryServiceRate::route('/create'),
            'edit' => Pages\EditDeliveryServiceRate::route('/{record}/edit'),
        ];
    }
}
