import express from "express";
// import userRoutes from "./src/user/user.routes";
import { connect } from "./config/database";
import tokenRoutes from "./token/token.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
connect();
// app.use((req, res, next) => {
//   console.log("fet 3al IDP");
//   res.status(200).json("re7et 3al IDP w rje3et ");
//   //next();
// });
app.use("/token", tokenRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//

// console.log("atta3et el IDp");
// app.use("/", Routes);

// //app.use("/", Routes);
