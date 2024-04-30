import express from 'express'
import jwt from 'jsonwebtoken'
import { secretKey, expiresIn } from './config/index.js'

const router = express.Router();

// 定义用户列表接口
router.get("/login", (req, res) => {
    // 在登录成功后，生成 JWT 字符串
    const tokenStr = jwt.sign({ username: "user123" }, secretKey, { expiresIn });

    // 将 token 发送给客户端
    res.send({ status: 200, message: "登录成功！", token: tokenStr });
});

export default router