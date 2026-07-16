const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ 
        message: "This is a protected route, welcome to your profile!",
        user: req.user
    });
});

module.exports = router;