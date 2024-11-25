<?php

namespace App\Notifications\Application\Checkout;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CheckoutSuccessNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Confirmation de paiement')
            ->greeting('Bonjour,')
            ->line('Nous avons le plaisir de vous informer que votre paiement a été traité avec succès.')
            ->line('Votre commande est désormais en cours de traitement et vous recevrez bientôt des informations supplémentaires concernant l’expédition.')
            ->action('Voir votre commande', url('https://tedmotospieces.fr/profile/orders'))
            ->line('Merci pour votre confiance et pour avoir choisi notre service.')
            ->line('N’hésitez pas à laisser un avis sur notre fiche d\'établissement Google afin de nous aider à améliorer notre service et de nous soutenir.')
            ->salutation('Cordialement,');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
