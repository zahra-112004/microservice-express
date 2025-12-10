<?php

namespace App\Services;

use App\Mail\UserRegisteredMail;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    public function sendRegistrationNotification(string $name, string $email): bool
    {
        try {
            // Mengirim email menggunakan Mailable yang sudah kita buat
            Mail::to($email)->send(new UserRegisteredMail($name, $email));

            // Jika berhasil dikirim
            return true;
        } catch (\Exception $e) {
            // Log error jika pengiriman gagal
           logger()->error("Failed to send notification to {$email}: " . $e->getMessage());
            return false;
        }
    }
}
