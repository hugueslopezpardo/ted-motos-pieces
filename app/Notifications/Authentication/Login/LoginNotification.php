<?php

namespace App\Notifications\Authentication\Login;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class LoginNotification extends Notification
{
    use Queueable;

    protected string $loginTime;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->loginTime = Carbon::now()->format('Y-m-d H:i:s');
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
            ->subject('Nouvelle connexion à votre compte')
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Une connexion a été détectée sur votre compte.')
            ->line('**Date et heure :** ' . $this->loginTime)
            ->line('Si ce n\'était pas vous, nous vous recommandons de changer votre mot de passe immédiatement.')
            ->salutation('Cordialement, TED MOTOS PIECES');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'ip_address' => $this->ipAddress,
            'login_time' => $this->loginTime,
        ];
    }
}
