import express from "express";
import { connect } from "./config/database";
import tokenRoutes from "./token/token.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connect();

const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log("fet 3al IDP");
  res.status(200).json("re7et 3al IDP w rje3et ");
  //next();
});

app.use("/token", tokenRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//

// console.log("atta3et el IDp");
// app.use("/", Routes);

// //app.use("/", Routes);
