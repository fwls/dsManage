const express = require("express");
const { pick } = require("lodash");
const router = express.Router();
const { verifyToken } = require("../../utils/index");
const knex = require("../../config/db");

// 获取数据源
router.get("/list", verifyToken, async (req, res) => {
  try {
    const query = knex("data_sources").select(
      "id",
      "name",
      "type",
      "conn_status",
      "status",
      "created_at"
    );
    const { name, type } = req.query;
    if (name) {
      query.where("name", "like", `%${name}%`);
    }
    if (type) {
      query.where("type", type);
    }
    if (req.query.status) {
      query.where("status", req.query.status);
    }
    const dataSources = await query
      .whereNull("deleted_at")
      .offset((req.query.page || 1) - 1)
      .limit(req.query.pageSize || 10);
    const totalCount = await knex("data_sources")
      .whereNull("deleted_at")
      .count("id as count")
      .where(name ? { name: `%${name}%` } : {})
      .where(type ? { type } : {});

    res.json({
      data: dataSources,
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

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const dataSource = await knex("data_sources").where("id", id).first();
    res.json({
      data: dataSource,
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

router.post("/add", verifyToken, async (req, res) => {
  const data = {
    name: req.body.name,
    type: req.body.type,
    url: req.body.url,
    username: req.body.username,
    password: req.body.password,
    database: req.body.database,
    ext: req.body.ext,
    port: req.body.port,
    charset: req.body.charset,
  };
  if (data.type == "javascript") {
    data.status = 1;
  }
  try {
    const [id] = await knex("data_sources").insert(data);
    res.json({
      data: id,
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

router.post("/edit", verifyToken, async (req, res) => {
  const { id } = req.body;
  const updateFields = [
    "name",
    "type",
    "url",
    "username",
    "password",
    "database",
    "charset",
    "ext",
    "port",
  ];
  const data = await knex("data_sources")
    .where("id", id)
    .update(pick(req.body, updateFields), "*")
    .catch((error) => {
      res.json({
        data: null,
        msg: error.message,
        code: 500,
      });
    });

  res.json({
    data,
    msg: "success",
    code: 200,
  });
});

router.post("/delete", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    await knex("data_sources").where("id", id).update({
      deleted_at: Date(),
    });
    res.json({
      data: null,
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
