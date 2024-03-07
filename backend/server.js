import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
//import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.error("Connection to db failed", err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
