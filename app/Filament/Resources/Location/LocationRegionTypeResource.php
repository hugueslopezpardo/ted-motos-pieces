<?php

namespace App\Filament\Resources\Location;

use App\Filament\Resources\Location\LocationRegionTypeResource\Pages;
use App\Filament\Resources\Location\LocationRegionTypeResource\RelationManagers;
use App\Models\Location\LocationRegionType;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Class LocationRegionTypeResource
 *
 * Represents the resource for managing location region types within the Filament admin panel.
 *
 * @package App\Filament\Resources\Location
 */
class LocationRegionTypeResource extends Resource
{
    protected static ?string $model = LocationRegionType::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin'; // Set the icon for navigation
    protected static ?string $navigationGroup = 'Gestion des emplacements'; // Group under which this resource will be listed
    protected static ?string $navigationLabel = 'Types de régions'; // Label for the navigation

    /**
     * Defines the form schema for creating and editing location region types.
     *
     * @param Form $form
     * @return Form
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom du type de région')
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required(),
            ]);
    }

    /**
     * Defines the table schema for displaying location region types.
     *
     * @param Table $table
     * @return Table
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom du type de région')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),
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

    /**
     * Defines the relations for the LocationRegionType resource.
     *
     * @return array
     */
    public static function getRelations(): array
    {
        return [];
    }

    /**
     * Defines the pages for the LocationRegionType resource.
     *
     * @return array
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLocationRegionTypes::route('/'),
            'create' => Pages\CreateLocationRegionType::route('/create'),
            'edit' => Pages\EditLocationRegionType::route('/{record}/edit'),
        ];
    }
}
