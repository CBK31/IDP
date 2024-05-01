import express from "express";
// import userRoutes from "./src/user/user.routes";
import { connect } from "./config/database";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
connect();

// app.use("/users", userRoutes);

app.use((req, res, next) => {
  console.log("fet 3al IDP");
  res.send("IDP is running");
  //next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
