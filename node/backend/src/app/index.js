import express from "express";

import bodyParser from "body-parser";
import _ from "express-async-errors";

import routes from "./routes/index.js";

const app = express();

app.get("/helth", function (req, res) {
  return res.send({
    version: "1.0.0",
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.use(function (err, req, res, next) {
  if (!err?.status) {
    return res.status(500).json({
      message: "Internal error",
    });
  }
  return res.status(err.status).json({
    message: err?.message,
  });
});

export default app;
