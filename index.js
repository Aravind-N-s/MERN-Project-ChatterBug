require("dotenv").config();
const { mongoose } = require("./config/database");
const port = process.env.PORT;
const express = require("express");
const { consoleLogger } = require("./config/logger");
const cors = require("cors");
const app = express();
const router = require("./config/routes");

app.use(express.json());
app.use(cors());

app.use("/chat", router);

app.listen(port, () => {
  consoleLogger.info("Listening on port", port);
});
