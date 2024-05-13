const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../utils/index');
const knex = require('../../config/db');

router.get('/list', verifyToken, async (req, res) => {
    // 根据分页生成data_sources表的查询逻辑,并使用json返回
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const offset = (page - 1) * pageSize

    const dataSources = await knex('data_sources')
        .select("id", "name", "type", "conn_status", "created_at")
        .offset(offset)
        .limit(pageSize);
    const totalCount = await knex('data_sources').count('id as count');

    res.json({
        data: dataSources,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total: parseInt(totalCount[0].count),
        msg: "success",
        code: 200
    });
});

router.get('/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const dataSource = await knex('data_sources').where('id', id).first();
    res.json({
        data: dataSource,
        msg: "success",
        code: 200
    });
});

router.post('/add', verifyToken, async (req, res) => {
    const { name, type, url, username, password, ext, database, port, charset} = req.body
    const [id] = await knex('data_sources').insert({
        name,
        type,
        url,
        username,
        password,
        database,
        ext,
        port,
        charset
    });
    res.json({
        data: id,
        msg: "success",
        code: 200
    });
});

router.post('/update', verifyToken, async (req, res) => {
    const { name, type, url, username, password, ext, database, port, charset} = req.body
    await knex('data_sources').where('id', id).update({
        name,
        type,
        url,
        username,
        password,
        database,
        charset,
        ext,
        port
    });
    res.json({
        data: null,
        msg: "success",
        code: 200
    });
});

module.exports = router;