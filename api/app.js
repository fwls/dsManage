const express = require('express');
var morgan = require('morgan');

const { errorHandler } = require('./utils');
const bodyParser = require("body-parser");
const routes = require("./controllers/index");

const app = express();


// Middleware
app.use(morgan('short'));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});