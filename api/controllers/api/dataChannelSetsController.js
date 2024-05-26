const express = require("express");
const { pick } = require("lodash");
const router = express.Router();
const knex = require("../../config/db");
const { verifyToken } = require("../../utils/index");

const tableNameSets = `data_channel_data_sets`;

router.get("/list", verifyToken, async (req, res) => {
  try {
    const query = knex(tableNameSets).where('user_id', req.user.id).select(
      "id",
      "name",
      "status",
      "data_set_id",
      "data_channel_id",
      "created_at"
    );
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
    const totalCount = await knex(tableNameSets)
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
    const result = await knex(tableNameSets).where("id", id).first();
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
    data_set_id: req.body.data_set_id,
    data_channel_id: req.body.data_channel_id,
    push_cron: req.body.push_cron,
    push_type: req.body.push_type,
    status: req.body.status,
  };
  try {
    const [id] = await knex(tableNameSets).insert(data);
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
  const updateFields = ["name", "push_type", "data_channel_id", "data_set_id" , "push_cron", "status"];
  const data = await knex(tableNameSets)
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
    await knex(tableNameSets).where("id", id).update({
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
