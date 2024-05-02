import express from "express";
const Routes = express.Router();
//import forwardRequest from "../utils/forwardRequest";
import dotenv from "dotenv";
dotenv.config();
const IDP_PATH = process.env.IDP_PATH;
const IDP_PORT = process.env.IDP_PORT;

//"http://localhost:3001"
//Routes.use("/signup");

const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

Routes.use("/signup", (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  jwt.verify(token, "a_secret_key", (err: any, user: any) => {
    if (err) return res.status(400).json({ message: "token is invalid" });
    // req.user = user;
    console.log("lezim y7ot el req.user info");
    next();
  });
});
module.exports = Routes;
