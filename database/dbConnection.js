import mongoose from "mongoose";
export const dbConnection = mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("db is connected succussfully");
  })
  .catch((err) => {
    console.log("db has failed to connect : ", err);
  });
