import app from "./src/app/index.js";
const port = process.env.PORT ?? 8000;
app.listen(port, (server) => {
  console.log(server);
  console.info(`Sever is runing in ${port} (mode = ${process.env.NODE_ENV})`);
});
