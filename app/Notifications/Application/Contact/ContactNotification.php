<?php

namespace App\Notifications\Application\Contact;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactNotification extends Notification
{
    use Queueable;

    private string $name;

    private string $email;

    private string $message;

    private string $subject = 'Nouveau message de contact';

    /**
     * Create a new notification instance.
     */
    public function __construct($name, $email, $message)
    {
        $this->name = $name;
        $this->email = $email;
        $this->message = $message;
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
            ->subject($this->subject)
            ->greeting('Bonjour,')
            ->line('Vous avez reçu un nouveau message de contact.')
            ->line('Nom: ' . $this->name)
            ->line('Email: ' . $this->email)
            ->line('Message: ' . $this->message)
            ->line('Merci.');
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
