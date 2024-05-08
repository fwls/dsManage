const { Hono } = require("hono");
const { jwtMiddleware } = require("../../middlewares");

const config = require("../../config");

const api = new Hono();

api.use("/index", jwtMiddleware);

api.get("/", async (c) => {
  //   const { limit, offset } = c.req.query();

  return c.json({ message: "Hello Node.js Api!" });
});

api.get("/index", async (c) => {
  //   const { limit, offset } = c.req.query();

  return c.json({ message: "Hello Node.js Api!" });
});

module.exports = api;
