import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { globalError } from "./src/middleware/globalError.js";
import { AppError } from "./src/utils/appError.js";
import { bootstrap } from "./src/modules/bootstrap.routes.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.set("query parser", "extended");
app.use(express.json());
app.use("/uploads", express.static("uploads"));

await dbConnection();

bootstrap(app);
app.use((req, res, next) => {
  next(new AppError(`Route not Found ${req.originalUrl}`, 404));
});
app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
