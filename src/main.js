import express from "express";
import cors from "cors";
import sequelize from "./utility/Connection.js";
import apiRouter from "./service/MainAPI.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

(async () => {
  await sequelize.sync({ alter: true });
})();

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
