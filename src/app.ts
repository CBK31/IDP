import express from "express";
import { connect } from "./config/database";
import tokenRoutes from "./token/token.routes";
import userRoutes from "./user/user.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connect();

const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log(`


 "============================== fet 3al IDP ======================================="


  req.originalUrl : ${req.originalUrl} 
  req.baseUrl : ${JSON.stringify(req.baseUrl)},
  headers: ${JSON.stringify(req.headers)},
  params: ${JSON.stringify(req.params)},
  body: ${JSON.stringify(req.body)},

  
  `);
  next();
});

app.use("/token", tokenRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
