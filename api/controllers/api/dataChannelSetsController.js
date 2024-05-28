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
    user_id: req.user.id,
  };
  try {
    const [id] = await knex(tableNameSets).insert(data);
    //node get请求本服务的/schedule接口，使用node原生http请求
    await reGenerateJob()

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
  const updateFields = {
    name: req.body.name,
    data_set_id: req.body.data_set_id,
    data_channel_id: req.body.data_channel_id,
    push_cron: req.body.push_cron,
    push_type: req.body.push_type,
    status: req.body.status,
    user_id: req.user.id,
  };
  const data = await knex(tableNameSets)
    .where("id", id)
    .update(updateFields)
    .catch((error) => {
      res.json({
        data: null,
        msg: error.message,
        code: 500,
      });
    });
  await reGenerateJob()
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

const reGenerateJob = async () => {
  const http = require('http');
  const config = require('../../config/index')

  // 定义请求选项
  const options = {
    hostname: 'localhost', // 或者是你的服务器IP地址
    port: config.port, // 你的Express服务监听的端口
    path: '/schedule?token=schedule', // 请求的路径
    method: 'GET', // 请求方法
    headers: {
      'Content-Type': 'application/json',
      // 添加其他需要的头部信息，如认证信息等
    }
  };

  // 发起请求
  const req = http.request(options, (res) => {
    let data = '';

    // 处理响应数据
    res.on('data', (chunk) => {
      data += chunk;
    });

    // 当所有数据接收完毕
    res.on('end', () => {
      try {
        const response = JSON.parse(data); // 假设响应体是JSON格式
        console.log('GET /schedule 响应:', response);
        // 在这里处理响应数据，例如更新任务、取消任务等
      } catch (error) {
        console.error('解析响应数据出错:', error);
      }
    });
  });

  // 处理请求过程中可能出现的错误
  req.on('error', (error) => {
    console.error(`请求发生错误: ${error.message}`);
  });

  // 结束请求（对于GET请求，通常不需要写数据）
  req.end();
}

module.exports = router;
