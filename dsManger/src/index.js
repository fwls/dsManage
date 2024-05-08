const { serve } = require("@hono/node-server");
const { serveStatic } = require("@hono/node-server/serve-static");
const { logger } = require("hono/logger");
const { prettyJSON } = require("hono/pretty-json");
const { Hono } = require("hono");


const app = new Hono();

// app.use(logger());
// app.use(prettyJSON());

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => c.text("Hello Node.js!"));

app.notFound((c) => c.json({ message: "Not Found", status: false }, 404));

const api = require("./controllers/api/index");
const authApi = require("./controllers/api/auth");
const dsV1Api = require("./controllers/api/v1/ds");

app.route("/api", api);
app.route("/api/auth", authApi);
app.route('/api/v1/ds', dsV1Api)

serve({
  fetch: app.fetch,
  port: 8787,
});
