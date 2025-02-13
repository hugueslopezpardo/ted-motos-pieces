<?php

namespace App\Notifications\Authentication\Register;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegisterNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public string $name,
        public string $email,
    )
    {

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
            ->subject('Bienvenue chez Ted Motos Pièces !')
            ->greeting('Bonjour ' . $this->name . ',')
            ->line('Nous sommes ravis de vous compter parmi les membres de la communauté Ted Motos Pièces.')
            ->line('Vous avez désormais accès à notre plateforme où vous pouvez découvrir nos pièces de moto de haute qualité et passer vos commandes en toute simplicité.')
            ->action('Visitez notre site', url('https://tedmotospieces.fr'))
            ->line('Si vous avez des questions, n\'hésitez pas à nous contacter. Nous sommes là pour vous aider.')
            ->line('À très bientôt sur Ted Motos Pièces !')
            ->salutation('Cordialement, L\'équipe Ted Motos Pièces');
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
