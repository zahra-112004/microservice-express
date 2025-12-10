const { sendNotification } = require('../services/notificationClient');
const userService = require('../services/userService');


const listUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error in listUsers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        res.json(user);
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Tambah user baru + kirim notifikasi
const postUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({ message: "Name, email and role are required." });
        }

        // 1️⃣ Buat user
        const newUser = await userService.createUser(name, email, role);

        // 2️⃣ Kirim notifikasi (async, jangan blocking)
        sendNotification(name, email)
            .then(result => console.log(`Notification status for ${email}:`, result.status))
            .catch(err => console.error(`Failed to send notification for ${email}:`, err.message));

        // 3️⃣ Kembalikan response
        res.status(201).json(newUser);

    } catch (error) {
        console.error("Error in postUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    listUsers,
    getUserById,
    postUser
};