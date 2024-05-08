const { decode, sign, verify } = require("hono/jwt");
const md5 = require("md5");
const { Hono } = require("hono");
const { User } = require("../../models");
const config = require("../../config");

const authApi = new Hono();

authApi.get("/", async (c) => {
  //   const { limit, offset } = c.req.query();
  return c.json({ message: "Hello Node.js Api!" });
});

authApi.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  const user = await User.query()
    .where("username", username)
    .where("password", md5(password))
    .first();

  if (user) {
    const payload = {
      id: user.id,
      username: user.username,
      exp: config.expireTime, // Token expires in 5 minutes
    };
    const token = await sign(payload, config.secretKey);

    return c.json({ token });
  } else {
    return c.json({ message: "User not found" }, 404);
  }
});

module.exports = authApi;
