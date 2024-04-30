// 在 user.js 文件中创建用户路由
import express from 'express'

const router = express.Router();

// 定义用户列表接口
router.get("/", (req, res) => {
    // 处理用户列表逻辑
    res.send("用户列表");
});

export default router