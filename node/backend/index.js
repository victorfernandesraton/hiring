import app from "./src/app/index.js";

app.listen(process.env.PORT ?? 8000, () => {
  console.info("Server is runing");
});
