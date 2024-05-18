const express = require("express");
const { pick } = require("lodash");
const router = express.Router();
const knex = require("../../config/db");
const { verifyToken } = require("../../utils/index");
const dbHelper = require("../../utils/dbHelper");

const tableName = `data_sets`;

router.get("/list", verifyToken, async (req, res) => {
  try {
    const query = knex(tableName)
      .leftJoin(
        "data_sources",
        "data_sources.id",
        "=",
        "data_sets.data_source_id"
      )
      .select(
        "data_sets.id",
        "data_sets.name",
        "data_sets.status",
        "data_sets.created_at",
        "data_sets.data_source_id",
        "data_sources.name as  data_sources_name"
      );
    const { name } = req.query;
    if (name) {
      query.where("data_sets.name", "like", `%${name}%`);
    }

    const results = await query
      .whereNull("data_sets.deleted_at")
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
    const result = await knex(tableName)
      .leftJoin(
        "data_sources",
        "data_sources.id",
        "=",
        "data_sets.data_source_id"
      )
      .select(
        "data_sets.id",
        "data_sets.name",
        "data_sets.status",
        "data_sets.content",
        "data_sets.data_source_id",
        "data_sources.name as  data_sources_name",
        "data_sources.type as  data_sources_type"
      )
      .where("data_sets.id", id)
      .first();
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
    content: req.body.content,
    data_source_id: req.body.data_source_id,
    status: req.body.status,
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
  const updateFields = ["name", "content", "data_source_id", "status"];
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
    await knex(tableName).where("id", id).update({
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

router.post("/execute", verifyToken, async (req, res) => {
  try {
    let dataSet = {};
    const { id } = req.body;
    if (id) {
      dataSet = await knex(tableName).where("id", id).first();
    } else {
      dataSet = req.body;
    }
  
    if (dataSet.data_source_id) {
      const dataSource = await knex("data_sources")
        .where("id", dataSet.data_source_id)
        .first();
      let result = null;
      switch (dataSource.type) {
        case "mysql":
          result = await dbHelper.executeQueryWithMysql(
            {
              host: dataSource.url,
              user: dataSource.username,
              password: dataSource.password,
              database: dataSource.database,
              port: dataSource.port,
              charset: dataSource.charset,
            },
            dataSet.content
          );

          break;
        case "pg":
          result = await dbHelper.executeQueryWithPg(
            {
              host: dataSource.url,
              user: dataSource.username,
              password: dataSource.password,
              database: dataSource.database,
              port: dataSource.port,
            },
            dataSet.content
          );

          break;
        case "javascript":
          result = await dbHelper.executeCodeInSandbox(dataSet.content);
          if (result.error != null) {
            // 抛出异常
            throw new Error(result.error);
          }
          break;
        default:
          res.json({
            data: null,
            msg: "data_source_type is not supported",
            code: 500,
          });
          break;
      }
      res.json({
        data: result,
        msg: "success",
        code: 200,
      });
    } else {
      res.json({
        data: null,
        msg: "data_source_id is required",
        code: 500,
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
