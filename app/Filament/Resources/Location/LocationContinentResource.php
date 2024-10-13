<?php

namespace App\Filament\Resources\Location;

use App\Filament\Resources\Location\LocationContinentResource\Pages;
use App\Filament\Resources\Location\LocationContinentResource\RelationManagers;
use App\Models\Location\LocationContinent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Class LocationContinentResource
 *
 * Represents the resource for managing location continents within the Filament admin panel.
 *
 * @package App\Filament\Resources\Location
 */
class LocationContinentResource extends Resource
{
    protected static ?string $model = LocationContinent::class;

    protected static ?string $navigationIcon = 'heroicon-o-globe-europe-africa';
    protected static ?string $navigationGroup = 'Gestion des emplacements';
    protected static ?string $navigationLabel = 'Continents';

    /**
     * Defines the form schema for creating and editing location continents.
     *
     * @param Form $form
     * @return Form
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom du continent')
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required(),
            ]);
    }

    /**
     * Defines the table schema for displaying location continents.
     *
     * @param Table $table
     * @return Table
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom du continent')
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
     * Defines the relations for the LocationContinent resource.
     *
     * @return array
     */
    public static function getRelations(): array
    {
        return [];
    }

    /**
     * Defines the pages for the LocationContinent resource.
     *
     * @return array
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLocationContinents::route('/'),
            'create' => Pages\CreateLocationContinent::route('/create'),
            'edit' => Pages\EditLocationContinent::route('/{record}/edit'),
        ];
    }
}
