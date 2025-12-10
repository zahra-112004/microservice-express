const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ✅ Path bersih (tidak double /users)
router.get("/", userController.listUsers);
router.post("/", userController.postUser);
router.get("/:id", userController.getUserById);


module.exports = router;
