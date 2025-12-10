<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function notify(Request $request)
    {
        // 1. Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid data provided',
                'errors' => $validator->errors()
            ], 400);
        }

        $data = $validator->validated();

        // 2. Memanggil Service Layer
        $success = $this->notificationService->sendRegistrationNotification(
            $data['name'],
            $data['email']
        );

        // 3. Memberikan respons yang sesuai
        if ($success) {
            return response()->json([
                'status' => 'sent'
            ]);
        } else {
            // Status: failed jika ada pengecualian saat mengirim email
            return response()->json([
                'status' => 'failed',
                'message' => 'Failed to send email notification'
            ], 500);
        }
    }
}
