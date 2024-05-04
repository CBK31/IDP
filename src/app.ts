import express from "express";
import { connect } from "./config/database";
import tokenRoutes from "./token/token.routes";
import userRoutes from "./user/user.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { inspect } from "util";
const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connect();

const PORT = process.env.PORT;

// for testing only
app.use((req, res, next) => {
  console.log(
    "============================== fet 3al IDP ======================================="
  );
  console.log(`


  req.originalUrl : ${req.originalUrl}
  headers: ${JSON.stringify(req.headers)},
  params: ${JSON.stringify(req.params)},
  body: ${JSON.stringify(req.body)},

  
  `);

  //console.log(inspect(req));
  next();
});

app.use(
  "/token",
  (req, res, next) => {
    console.log("fetet 3al /token bel IDP ");
    next();
  },
  tokenRoutes
);

app.use(
  "/user",
  (req, res, next) => {
    console.log("fetet 3al /user bel IDP ");
    next();
  },
  userRoutes
);

// for testing only
// app.use((req, res, next) => {
//   console.log("fet 3al IDP");
//   res.status(200).json("re7et 3al IDP w rje3et ");
//   //  next();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//

// console.log("atta3et el IDp");
// app.use("/", Routes);

// //app.use("/", Routes);
