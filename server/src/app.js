const express = require("express");
const UserRouter = require("./user/UserRouter");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json({ limit: "3mb" }));

app.use(UserRouter);

module.exports = app;
