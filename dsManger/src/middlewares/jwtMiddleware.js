const { verify } = require("hono/jwt");
const config = require("../config");

const jwtMiddleware = async (c, next) => {
  const token = c.req.header("authorization").replace("Bearer ", "");

  try {
    const verifyToken = await verify(token, config.secretKey);
    c.userInfo = verifyToken;
    console.log(c.userInfo);
  } catch (error) {
    return c.json({ msg: "Unauthorized", code: 401 });
  }
  await next();
};

module.exports = jwtMiddleware;
