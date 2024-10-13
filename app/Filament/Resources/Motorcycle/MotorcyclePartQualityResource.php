<?php

namespace App\Filament\Resources\Motorcycle;

use App\Filament\Resources\Motorcycle\MotorcyclePartQualityResource\Pages;
use App\Models\Motorcycle\MotorcyclePartQuality;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Represents the resource for managing motorcycle part qualities.
 */
class MotorcyclePartQualityResource extends Resource
{
    protected static ?string $model = MotorcyclePartQuality::class;

    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle';

    protected static ?string $navigationGroup = 'Gestion des produits';

    protected static ?string $navigationLabel = 'Qualités de pièces';

    /**
     * Define the form schema for creating and editing motorcycle part qualities.
     *
     * @param Form $form - The form instance.
     * @return Form - The configured form instance.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom de la qualité')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    /**
     * Define the table schema for listing motorcycle part qualities.
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
     * Get the relations for the motorcycle part quality resource.
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
     * Get the pages for the motorcycle part quality resource.
     *
     * @return array - The routes for the resource's pages.
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMotorcyclePartQualities::route('/'),
            'create' => Pages\CreateMotorcyclePartQuality::route('/create'),
            'edit' => Pages\EditMotorcyclePartQuality::route('/{record}/edit'),
        ];
    }
}
