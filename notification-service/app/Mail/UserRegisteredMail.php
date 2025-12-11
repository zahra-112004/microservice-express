<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserRegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;

   public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Selamat! Pendaftaran Anda Berhasil',
        );
    }


    public function content(): Content
   {
        return new Content(
            view: 'emails.user-registered',
        );
    }
 
    public function attachments(): array
    {
        return [];
    }
}
