<?php

namespace App\Filament\Resources\Order;

use App\Filament\Resources\Order\OrderResource\Pages;
use App\Models\Order\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

/**
 * Represents the resource for managing orders.
 */
class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-archive-box-arrow-down';

    protected static ?string $navigationGroup = 'Gestion des commandes';

    protected static ?string $navigationLabel = 'Commandes';

    /**
     * Define the form schema for creating and editing orders.
     *
     * @param Form $form - The form instance.
     * @return Form - The configured form instance.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('order_status_id')
                    ->relationship('status', 'name')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Client')
                    ->disabled()
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\TextInput::make('created_at')
                    ->label('Date de la commande')
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('total')
                    ->label('Total')
                    ->suffix('€')
                    ->disabled()
                    ->columnSpanFull(),
            ]);
    }

    /**
     * Define the table schema for listing orders.
     *
     * @param Table $table - The table instance.
     * @return Table - The configured table instance.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status.name')
                    ->searchable()
                    ->label('Statut')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total')
                    ->money('EUR')
                    ->label('Total')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date de la commande')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('items_count')
                    ->label('Nombre de pièces')
                    ->counts('items') // Compte le nombre d'items associés
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('order_status_id')
                    ->relationship('status', 'name')
                    ->label('Statut')
                    ->options([
                        ['value' => '1', 'label' => 'En attente'],
                        ['value' => '2', 'label' => 'En cours'],
                        ['value' => '3', 'label' => 'Terminé'],
                        ['value' => '4', 'label' => 'Annulé'],
                        ['value' => '5', 'label' => 'Remboursé'],
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('invoice')
                    ->label('Voir Facture')
                    ->icon('heroicon-o-document-text')
                    ->url(fn (Order $record) => route('invoice.invoice', $record->id))
                    ->openUrlInNewTab(), // Optionally open in a new tab
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    /**
     * Get the relations for the order resource.
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
     * Get the pages for the order resource.
     *
     * @return array - The routes for the resource's pages.
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
