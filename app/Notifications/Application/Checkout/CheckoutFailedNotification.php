<?php

namespace App\Notifications\Application\Checkout;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CheckoutFailedNotification extends Notification
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
            ->subject('Échec du paiement')
            ->greeting('Bonjour,')
            ->line('Nous sommes désolés de vous informer que votre paiement a échoué.')
            ->line('Veuillez vérifier vos informations de paiement et réessayer. Si le problème persiste, n’hésitez pas à contacter notre service client.')
            ->line('Nous vous remercions pour votre confiance et espérons vous revoir bientôt.');
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
