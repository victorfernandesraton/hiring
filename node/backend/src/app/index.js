import express from "express";
import routes from "../routes/index.js";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({
    message: "Internal error",
  });
});
const start = (port) => app.listen(port);

export { app as default, start };
