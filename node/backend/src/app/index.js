import express from "express";
import bodyParser from "body-parser";
import _ from "express-async-errors";

import routes from "./routes/index.js";

const app = express();

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
const start = (port) => app.listen(port);

export { app as default, start };
