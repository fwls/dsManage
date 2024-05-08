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

app.route("/api", api);
app.route("/api/auth", authApi);

serve({
  fetch: app.fetch,
  port: 8787,
});
