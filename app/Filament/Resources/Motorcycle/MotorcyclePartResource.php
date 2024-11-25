<?php

namespace App\Filament\Resources\Motorcycle;

use App\Filament\Resources\Motorcycle\MotorcyclePartResource\Pages;
use App\Models\Motorcycle\MotorcyclePart;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Represents the resource for managing motorcycle parts.
 */
class MotorcyclePartResource extends Resource
{
    protected static ?string $model = MotorcyclePart::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench';

    protected static ?string $navigationGroup = 'Gestion des produits';

    protected static ?string $navigationLabel = 'Pièces';

    /**
     * Define the form schema for creating and editing motorcycle parts.
     *
     * @param Form $form - The form instance.
     * @return Form - The configured form instance.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom de la pièce')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('price')
                    ->label('Prix')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Forms\Components\TextInput::make('weight')
                    ->label('Poids (Kg)')
                    ->required()
                    ->numeric(),
                Forms\Components\FileUpload::make('images')
                    ->label('Images')
                    ->disk('public')
                    ->multiple()
                    ->directory('motorcycle_parts')
                    ->image()
                    ->imageEditor()
                    ->minFiles(0)
                    ->maxFiles(5)
                    ->columnSpanFull()
                    ->reorderable()
                    ->appendFiles()
                    ->panelLayout('grid'),
                Forms\Components\Select::make('motorcycle_id')
                    ->label('Moto')
                    ->relationship('motorcycle', 'name')
                    ->required(),
                Forms\Components\Select::make('motorcycle_part_type_id')
                    ->label('Type de pièce')
                    ->relationship('type', 'name')
                    ->required(),
                Forms\Components\Select::make('motorcycle_part_quality_id')
                    ->label('Qualité de la pièce')
                    ->relationship('quality', 'name')
                    ->required(),
                Forms\Components\Select::make('delivery_service_id')
                    ->label('Service de livraison')
                    ->relationship('deliveryService', 'name')
                    ->required(),
                Forms\Components\Toggle::make('is_active')
                    ->label('Mettre en vente')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Toggle::make('is_heavy')
                    ->label('Le colis est-il volumineux ?')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Toggle::make('is_sold_out')
                    ->label('Vendu')
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    /**
     * Define the table schema for listing motorcycle parts.
     *
     * @param Table $table - The table instance.
     * @return Table - The configured table instance.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('Référence')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\ImageColumn::make('images')
                    ->label('Images')
                    ->disk('public')
                    ->height(50)
                    ->width(50),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom de la pièce')
                    ->searchable(),
                Tables\Columns\TextColumn::make('motorcycle.brand.name')
                    ->label('Marque')
                    ->sortable(),
                Tables\Columns\TextColumn::make('motorcycle.name')
                    ->label('Nom de la moto')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Prix')
                    ->money('EUR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('weight')
                    ->label('Poids')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type.name')
                    ->label('Type de pièce')
                    ->sortable(),
                Tables\Columns\TextColumn::make('quality.name')
                    ->label('Qualité de la pièce')
                    ->sortable(),
                Tables\Columns\TextColumn::make('deliveryService.name')
                    ->label('Service de livraison')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Actif')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_heavy')
                    ->label('Lourd')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_sold_out')
                    ->label('Vendu')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date de création')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Date de modification')
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
     * Get the relations for the motorcycle part resource.
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
     * Get the pages for the motorcycle part resource.
     *
     * @return array - The routes for the resource's pages.
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMotorcycleParts::route('/'),
            'create' => Pages\CreateMotorcyclePart::route('/create'),
            'edit' => Pages\EditMotorcyclePart::route('/{record}/edit'),
        ];
    }
}
