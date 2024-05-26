const express = require("express");
const { pick } = require("lodash");
const router = express.Router();
const knex = require("../../config/db");
const { verifyToken } = require("../../utils/index");

const tableName = `data_channels`;
const tableNameSets = `data_channel_data_sets`;

router.get("/list", verifyToken, async (req, res) => {
  try {
    const query = knex(tableName).where('user_id', req.user.id).select("id", "name", "status", "created_at");
    const { name } = req.query;
    if (name) {
      query.where("name", "like", `%${name}%`);
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
      .where(name ? { name: `%${name}%` } : {});

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

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await knex(tableName).where("id", id).first();
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

router.post("/add", verifyToken, async (req, res) => {
  const data = {
    name: req.body.name,
    remark: req.body.remark,
    status: req.body.status,
    user_id: req.user.id,
  };

  try {
    const [id] = await knex(tableName).insert(data);
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
  const updateFields = ["name", "remark", "status"];
  const data = await knex(tableName)
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
    const sets = await knex(tableNameSets).where("data_channel_id", id);
    if (sets) {
      res.json({
        data: null,
        msg: '当前频道中含有数据集，无法删除',
        code: 500,
      });
    } else {
      await knex(tableName).where("id", id).update({
        deleted_at: Date(),
      });
      res.json({
        data: null,
        msg: "success",
        code: 200,
      });
    }
  } catch (error) {
    res.json({
      data: null,
      msg: error.message,
      code: 500,
    });
  }
});

module.exports = router;
