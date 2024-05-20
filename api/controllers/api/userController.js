const express = require('express');
const router = express.Router();
const knex = require('../../config/db');

router.get('/users', (req, res) => {
  // 获取所有用户的逻辑
});

router.get('/users/:id', (req, res) => {
  // 获取单个用户的逻辑
});

module.exports = router;