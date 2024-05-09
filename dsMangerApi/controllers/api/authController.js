const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwtConfig");
const knex = require("../../config/db");

router.post("/login", async (req, res) => {
  // 实现登录逻辑，验证用户信息等
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "请提供用户名和密码", code: 500 });
  }

  try {
    const user = await knex("users").where("username", username).first();

    if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ msg: "无效的用户名或密码", code: 500 });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "30d" });
    return res.status(200).json({ token, code: 200, msg: "登录成功" });
  } catch (err) {
    return res.status(500).json({ msg: "服务器错误", code: 500 });
  }
});


router.post("/register", async (req, res) => {
  // 实现注册逻辑，创建新用户等
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "请提供用户名、密码和邮箱" });
  }

  try {
    const existingUser = await knex("users")
      .where("username", username)
      .orWhere("email", email)
      .first();

    if (existingUser) {
      return res.status(400).json({ message: "用户名或邮箱已存在" });
    }

    const newUser = {
      username,
      password,
      email,
    };

    const userIds = await knex("users").insert(newUser);
    const userId = userIds[0];

    const token = jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "服务器错误" });
  }
});

module.exports = router;
