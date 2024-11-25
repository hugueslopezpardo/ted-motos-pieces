<?php

namespace App\Filament\Resources\User;

use App\Filament\Resources\User\UserDetailResource\Pages;
use App\Filament\Resources\User\UserDetailResource\RelationManagers;
use App\Models\User\UserDetail;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserDetailResource extends Resource
{
    protected static ?string $model = UserDetail::class;

    protected static ?string $navigationIcon = 'heroicon-o-user'; // Set the icon for navigation
    protected static ?string $navigationGroup = 'Gestion des utilisateurs'; // Group under which this resource will be listed
    protected static ?string $navigationLabel = 'Utilisateurs'; // Label for the navigation

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_id')
                    ->required()
                    ->disabled()
                    ->numeric(),
                Forms\Components\TextInput::make('phone_number')
                    ->tel()
                    ->disabled()
                    ->required()
                    ->maxLength(255)
                    ->default('-'),
                Forms\Components\TextInput::make('location_region_id')
                    ->required()
                    ->disabled()
                    ->numeric(),
                Forms\Components\TextInput::make('location_department_id')
                    ->required()
                    ->disabled()
                    ->numeric(),
                Forms\Components\TextInput::make('postal_code')
                    ->required()
                    ->disabled()
                    ->maxLength(255)
                    ->default('-'),
                Forms\Components\TextInput::make('address')
                    ->required()
                    ->disabled()
                    ->maxLength(255)
                    ->default('-'),
                Forms\Components\TextInput::make('city')
                    ->required()
                    ->disabled()
                    ->maxLength(255)
                    ->default('-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Nom')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Téléphone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('locationRegion.name')
                    ->label('Région')
                    ->sortable(),
                Tables\Columns\TextColumn::make('locationDepartment.name')
                    ->label('Département')
                    ->sortable(),
                Tables\Columns\TextColumn::make('postal_code')
                    ->label('Code postal')
                    ->searchable(),
                Tables\Columns\TextColumn::make('address')
                    ->label('Adresse')
                    ->searchable(),
                Tables\Columns\TextColumn::make('city')
                    ->label('Ville')
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
            'index' => Pages\ListUserDetails::route('/'),
            'create' => Pages\CreateUserDetail::route('/create'),
            'edit' => Pages\EditUserDetail::route('/{record}/edit'),
        ];
    }
}
