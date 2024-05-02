"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const token_routes_1 = __importDefault(require("./token/token.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
dotenv_1.default.config();
(0, database_1.connect)();
const PORT = process.env.PORT;
app.use((req, res, next) => {
    console.log("fet 3al IDP");
    res.status(200).json("re7et 3al IDP w rje3et ");
    //next();
});
app.use("/token", token_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//
// console.log("atta3et el IDp");
// app.use("/", Routes);
// //app.use("/", Routes);
