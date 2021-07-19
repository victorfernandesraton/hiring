const express = require("express");
const bodyParser = require("body-parser");

const routers = require("../routes/");

const app = express();

app.use(bodyParser.json());
app.use(routers);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({
    message: "Internal error",
  });
});
const start = (port) => app.listen(port);

module.exports = {
  ...app,
  start: (port) => start(port),
};
