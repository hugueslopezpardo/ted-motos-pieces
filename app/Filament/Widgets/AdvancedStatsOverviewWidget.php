<?php

namespace App\Filament\Widgets;

use App\Models\Motorcycle\MotorcyclePart;
use App\Models\Order\Order;
use App\Models\User\User;
use EightyNine\FilamentAdvancedWidget\AdvancedStatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AdvancedStatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Nombre total d\'utilisateurs', User::count())->icon('heroicon-o-user')
                ->chartColor('success')
                ->descriptionIcon('heroicon-o-chevron-up', 'before')
                ->descriptionColor('success'),
            Stat::make('Nombre total des ventes', Order::count())->icon('heroicon-o-newspaper')
                ->chartColor('success')
                ->descriptionIcon('heroicon-o-chevron-up', 'before')
                ->descriptionColor('success'),
            Stat::make('Montant total des ventes', number_format(Order::totalSales(), 2, ',', ' ') . ' €')->icon('heroicon-o-chat-bubble-left-ellipsis')
                ->chartColor('success'),
             Stat::make('Valeur du stock', number_format(MotorcyclePart::totalValue(), 2, ',', ' ') . ' €')->icon('heroicon-o-chat-bubble-left-ellipsis')
                 ->chartColor('success')
        ];
    }
}
