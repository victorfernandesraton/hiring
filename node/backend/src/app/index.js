import express from "express";

import morgan from "morgan";

import bodyParser from "body-parser";
import _ from "express-async-errors";

import routes from "./routes/index.js";
import { ApplicationError } from "../adapter/error.js";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/helth", function (req, res) {
  return res.send({
    version: "1.0.0",
  });
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use((req, res, next) => {
  next(new ApplicationError("Not Found", 404));
});

app.use((err, req, res, next) => {
  if (err?.status) {
    res.status(err.status);
    res.json({ message: err.message });
    return res;
  } else {
    res.status(404).json({ message: "not found" });
    return res;
  }
});

export default app;
