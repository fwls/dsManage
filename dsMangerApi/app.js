const express = require('express');
const { errorHandler } = require('./utils');
const bodyParser = require("body-parser");
const routes = require("./controllers/index");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});