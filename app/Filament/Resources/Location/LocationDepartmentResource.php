<?php

namespace App\Filament\Resources\Location;

use App\Filament\Resources\Location\LocationDepartmentResource\Pages;
use App\Filament\Resources\Location\LocationDepartmentResource\RelationManagers;
use App\Models\Location\LocationDepartment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Class LocationDepartmentResource
 *
 * Represents the resource for managing location departments within the Filament admin panel.
 *
 * @package App\Filament\Resources\Location
 */
class LocationDepartmentResource extends Resource
{
    protected static ?string $model = LocationDepartment::class;

    protected static ?string $navigationIcon = 'heroicon-o-map'; // Set the icon for navigation
    protected static ?string $navigationGroup = 'Gestion des emplacements'; // Group under which this resource will be listed
    protected static ?string $navigationLabel = 'Départements'; // Label for the navigation

    /**
     * Defines the form schema for creating and editing location departments.
     *
     * @param Form $form
     * @return Form
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom du département')
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required(),
            ]);
    }

    /**
     * Defines the table schema for displaying location departments.
     *
     * @param Table $table
     * @return Table
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom du département')
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
     * Defines the relations for the LocationDepartment resource.
     *
     * @return array
     */
    public static function getRelations(): array
    {
        return [];
    }

    /**
     * Defines the pages for the LocationDepartment resource.
     *
     * @return array
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLocationDepartments::route('/'),
            'create' => Pages\CreateLocationDepartment::route('/create'),
            'edit' => Pages\EditLocationDepartment::route('/{record}/edit'),
        ];
    }
}
