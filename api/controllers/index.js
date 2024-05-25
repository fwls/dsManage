const express = require("express");
const authApiRoutes = require("./api/authController");
const userApiRoutes = require("./api/userController");
const dataSourceApiRoutes = require("./api/dataSourceController");
const dataChannelApiRoutes = require("./api/dataChannelController");
const dataChannelSetsApiRoutes = require("./api/dataChannelSetsController");
const dataSetApiRoutes = require("./api/dataSetController");

const router = express.Router();

router.use("/api/auth", authApiRoutes);
router.use("/api/user", userApiRoutes);
router.use("/api/dataSource", dataSourceApiRoutes);
router.use("/api/dataChannel", dataChannelApiRoutes);
router.use("/api/dataChannel/sets", dataChannelSetsApiRoutes);
router.use("/api/dataSet", dataSetApiRoutes);


module.exports = router;