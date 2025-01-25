<?php

namespace App\Filament\Resources\Motorcycle;

use App\Filament\Resources\Motorcycle\MotorcycleResource\Pages;
use App\Models\Motorcycle\Motorcycle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Represents the resource for managing motorcycles.
 */
class MotorcycleResource extends Resource
{
    protected static ?string $model = Motorcycle::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog';

    protected static ?string $navigationLabel = 'Motos';

    protected static ?string $navigationGroup = 'Gestion des produits';

    protected static ?string $recordTitleAttribute = 'Motos';

    /**
     * Define the form schema for creating and editing motorcycles.
     *
     * @param Form $form - The form instance.
     * @return Form - The configured form instance.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nom')
                    ->required(),
                Forms\Components\TextInput::make('year')
                    ->label('Année')
                    ->required()
                    ->numeric(),
                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->directory('motorcycles')
                    ->image()
                    ->columnSpanFull(),
                Forms\Components\Select::make('motorcycle_brand_id')
                    ->label('Marque de moto')
                    ->relationship('brand', 'name')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_on_sale')
                    ->label('En vente')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_archived')
                    ->label('Archivé')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_accessoires')
                    ->label('Ensemble d\'accessoires pour moto')
                    ->required()
                    ->disabled()
                    ->columnSpanFull(),
            ]);
    }

    /**
     * Define the table schema for listing motorcycles.
     *
     * @param Table $table - The table instance.
     * @return Table - The configured table instance.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->height(50)
                    ->width(50),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),
                Tables\Columns\TextColumn::make('year')
                    ->label('Année')
                    ->sortable(),
                Tables\Columns\TextColumn::make('brand.name')
                    ->label('Marque de moto')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_on_sale')
                    ->label('En vente')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_archived')
                    ->label('Archivé')
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
     * Get the relations for the motorcycle resource.
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
     * Get the pages for the motorcycle resource.
     *
     * @return array - The routes for the resource's pages.
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMotorcycles::route('/'),
            'create' => Pages\CreateMotorcycle::route('/create'),
            'edit' => Pages\EditMotorcycle::route('/{record}/edit'),
        ];
    }
}
