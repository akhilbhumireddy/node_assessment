const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes");

const app = express();
app.use(bodyParser.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
