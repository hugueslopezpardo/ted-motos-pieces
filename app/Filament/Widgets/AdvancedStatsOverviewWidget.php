<?php

namespace App\Filament\Widgets;

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
            Stat::make('Montant total des ventes', Order::totalSales() . ' €')->icon('heroicon-o-chat-bubble-left-ellipsis')
                ->chartColor('success')
        ];
    }
}
