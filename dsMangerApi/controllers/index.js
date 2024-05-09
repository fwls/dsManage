const express = require("express");
const authApiRoutes = require("./api/authController");
const userApiRoutes = require("./api/userController");
const dataSourceApiRoutes = require("./api/dataSourceController");

const router = express.Router();

router.use("/api/auth", authApiRoutes);
router.use("/api/user", userApiRoutes);
router.use("/api/dataSource", dataSourceApiRoutes);

module.exports = router;
