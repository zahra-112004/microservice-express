const axios = require('axios');

// Pastikan NOTIFICATION_SERVICE_URL dimuat dari .env
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;

const sendNotification = async (name, email) => {
    if (!NOTIFICATION_SERVICE_URL) {
        console.error("NOTIFICATION_SERVICE_URL is not set in .env");
        // Pilih untuk melempar error atau hanya mencatat log
        throw new Error("Notification Service URL not configured.");
    }

    try {
        const payload = {
            name: name,
            email: email
        };

        const response = await axios.post(`${NOTIFICATION_SERVICE_URL}/api/notify`, payload);

        // Mengembalikan status dari Notification Service
        return response.data;
    } catch (error) {
        // Log error, tetapi *jangan* hentikan proses User Service
        console.error(`Error communicating with Notification Service: ${error.message}`);
        
        // Catatan: Dalam produksi, Anda mungkin ingin menggunakan pola 'Circuit Breaker' atau 'Message Queue'
        // untuk menangani kegagalan layanan yang terisolasi.
        return { status: 'notification_failed', error: error.message };
    }
};

module.exports = {
    sendNotification
};