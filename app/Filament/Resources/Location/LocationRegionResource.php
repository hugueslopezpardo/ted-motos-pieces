<?php

namespace App\Filament\Resources\Location;

use App\Filament\Resources\Location\LocationRegionResource\Pages;
use App\Filament\Resources\Location\LocationRegionResource\RelationManagers;
use App\Models\Location\LocationRegion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Class LocationRegionResource
 *
 * Represents the resource for managing location regions within the Filament admin panel.
 *
 * @package App\Filament\Resources\Location
 */
class LocationRegionResource extends Resource
{
    protected static ?string $model = LocationRegion::class;

    protected static ?string $navigationIcon = 'heroicon-o-globe-alt'; // Set the icon for navigation
    protected static ?string $navigationGroup = 'Gestion des emplacements'; // Group under which this resource will be listed
    protected static ?string $navigationLabel = 'Régions'; // Label for the navigation

    /**
     * Defines the form schema for creating and editing location regions.
     *
     * @param Form $form
     * @return Form
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom de la région')
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required(),
            ]);
    }

    /**
     * Defines the table schema for displaying location regions.
     *
     * @param Table $table
     * @return Table
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom de la région')
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
     * Defines the relations for the LocationRegion resource.
     *
     * @return array
     */
    public static function getRelations(): array
    {
        return [];
    }

    /**
     * Defines the pages for the LocationRegion resource.
     *
     * @return array
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLocationRegions::route('/'),
            'create' => Pages\CreateLocationRegion::route('/create'),
            'edit' => Pages\EditLocationRegion::route('/{record}/edit'),
        ];
    }
}
