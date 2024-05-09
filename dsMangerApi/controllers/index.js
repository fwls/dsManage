const express = require("express");
const authApiRoutes = require("./api/authRoutes");
const userApiRoutes = require("./api/userRoutes");

const router = express.Router();

router.use("/api/auth", authApiRoutes);
router.use("/api/user", userApiRoutes);

module.exports = router;
