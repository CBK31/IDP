import express from "express";
import { signIn, signUp, viewProfile } from "./user.controller";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile/view", viewProfile);
router.patch("/profile/edit");
export default router;
