const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { verifyToken } = require("../../utils/index");
const knex = require("../../config/db");
const { route } = require("./authController");

const tableName = "users"

router.get("/list", verifyToken, async (req, res) => {
  try {
    const query = knex(tableName).select("id", "username", "email", "status", "created_at");
    const { name } = req.query;
    if (name) {
      query.whereLike("username", `%${name}%`);
    }
    if (req.query.status) {
      query.where("status", req.query.status);
    }

    const results = await query
      .whereNull("deleted_at")
      .offset((req.query.page || 1) - 1)
      .limit(req.query.pageSize || 10);
    const totalCount = await knex(tableName)
      .whereNull("deleted_at")
      .count("id as count")
      .where(name ? { username: `%${name}%` } : {});

    res.json({
      data: results,
      page: parseInt(req.query.page),
      pageSize: parseInt(req.query.pageSize),
      total: parseInt(totalCount[0].count),
      msg: "success",
      code: 200,
    });
  } catch (error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});

router.get('/:id', async (req, res) => {
  // 获取单个用户的逻辑
  try {
    const id = req.params.id;
    const result = await knex(tableName).where('id', id).first("id", "username", "email", "status", "created_at");
    res.json({
      data: result,
      msg: "success",
      code: 200,
    });
  } catch(error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});


router.post('/add', async (req, res) => {
  // 获取单个用户的逻辑
  try {
    const data = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      status: req.body.status
    }
    const result = await knex(tableName).insert(data)
    res.json({
      data: result,
      msg: "success",
      code: 200,
    });
  } catch (error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});

router.post('/edit', async (req, res) => {
  // 获取单个用户的逻辑
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      status: req.body.status
    }

    if (req.body.password) {
      data.password = bcrypt.hashSync(req.body.password, 10);
    }
    const result = await knex(tableName).where('id', req.body.id).update(data)
    res.json({
      data: result,
      msg: "success",
      code: 200,
    });
  } catch (error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});

// 删除
router.post('/delete', async (req, res) => {
  // 获取单个用户的逻辑
  try {
    const data = {
      deleted_at: Date()
    }
    const result = await knex(tableName).where('id', req.body.id).update(data)
    res.json({
      data: result,
      msg: "success",
      code: 200,
    });
  } catch (error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});

module.exports = router;