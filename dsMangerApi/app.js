const express = require('express');
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const authRoutes = require('./controllers/api/authRoutes');

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});