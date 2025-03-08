const express = require("express");
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    email
} = require("../controllers/userController");

const validateUser=require("../middleware/inputValidator")

const router = express.Router();

router.get("/user", getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUserById);
router.post("/user/email", email)

module.exports = router;
