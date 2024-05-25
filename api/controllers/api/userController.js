const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwtConfig");
const knex = require("../../config/db");

router.get('/list', (req, res) => {
  // 获取所有用户的逻辑

});

router.get('/users/:id', (req, res) => {
  // 获取单个用户的逻辑
});

module.exports = router;