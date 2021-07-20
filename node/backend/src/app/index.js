import express from "express";
import request from "supertest";

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

request(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end(function (err, res) {
    console.log(err, res);
    if (err) throw err;
  });

export default app;
