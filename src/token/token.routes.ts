import express from "express";
import { verifyTokenController } from "./token.controller";
const router = express.Router();

router.post("/verify", verifyTokenController);

export default router;
