<?php

namespace App\Filament\Resources\Motorcycle;

use App\Filament\Resources\Motorcycle\MotorcycleBrandResource\Pages;
use App\Models\Motorcycle\MotorcycleBrand;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Represents the resource for managing motorcycle brands.
 */
class MotorcycleBrandResource extends Resource
{
    protected static ?string $model = MotorcycleBrand::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';

    protected static ?string $navigationGroup = 'Gestion des produits';

    protected static ?string $navigationLabel = 'Marques de motos';

    /**
     * Define the form schema for creating and editing motorcycle brands.
     *
     * @param Form $form - The form instance.
     * @return Form - The configured form instance.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom de la marque')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Select::make('location_continent_id')
                    ->label('Continent')
                    ->columnSpanFull()
                    ->relationship('continent', 'name')
                    ->required(),
            ]);
    }

    /**
     * Define the table schema for listing motorcycle brands.
     *
     * @param Table $table - The table instance.
     * @return Table - The configured table instance.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('continent.name')
                    ->label('Continent')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Define any filters if needed
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
     * Get the relations for the motorcycle brand resource.
     *
     * @return array - The relations associated with the resource.
     */
    public static function getRelations(): array
    {
        return [
            // Define any relations if needed
        ];
    }

    /**
     * Get the pages for the motorcycle brand resource.
     *
     * @return array - The routes for the resource's pages.
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMotorcycleBrands::route('/'),
            'create' => Pages\CreateMotorcycleBrand::route('/create'),
            'edit' => Pages\EditMotorcycleBrand::route('/{record}/edit'),
        ];
    }
}
