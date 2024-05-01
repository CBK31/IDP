"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import userRoutes from "./src/user/user.routes";
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, database_1.connect)();
// app.use("/users", userRoutes);
app.use((req, res, next) => {
  res.send("IDP is running");
  //console.log("fet 3al IDP");
  //next();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
