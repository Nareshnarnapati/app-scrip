const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const connectDb = require("./db");
const productRouter = require("./routes/productRouter");

dotEnv.config();
const port = process.env.PORT;

app.use(express.json());

app.use("/products", productRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server Running At http://localhost:${port}`);
  });
});