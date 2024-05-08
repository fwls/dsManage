const { Hono } = require("hono");
const { jwtMiddleware } = require("../../../../middlewares");
const { DataSources } = require("../../../../models");

const dsV1Api = new Hono();

dsV1Api.use("/*", jwtMiddleware);

dsV1Api.get("/", async (c) => {
  const { limit, page } = c.req.query();
  page ? page : (page = 1);
  limit ? limit : (limit = 10);
  const results = await DataSources.query().paginate(page, limit);
  const count = await DataSources.query().count();
  return c.json({ msg: "success", data: results, count });
});

dsV1Api.get("/save", async (c) => {
  try {
    const body = await c.req.json();
    const result = await DataSources.query().create(body);
    return c.json({ msg: "success", data: result, code: 200 });
  } catch (error) {
    return c.json({ msg: error.message, data: '', code: 500 });
  }
});

dsV1Api.get("/update", async (c) => {
    try {
      const body = await c.req.json();
      const result = await DataSources.query().where('id', body.id).update(body);
      return c.json({ msg: "success", data: result, code: 200 });
    } catch (error) {
      return c.json({ msg: error.message, data: '', code: 500 });
    }
  });

dsV1Api.get("/index", async (c) => {
  //   const { limit, offset } = c.req.query();
  return c.json({ message: "Hello Node.js Api!" });
});

module.exports = dsV1Api;
