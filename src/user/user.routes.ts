import express from "express";
import { validate } from "../middleware/bodyValidator";
import {
  signupSchema,
  signinSchema,
  editProfileSchema,
} from "./user.validationSchemas";
import * as UserController from "./user.controller";

const router = express.Router();

router.post("/signup", validate(signupSchema), UserController.signUp);
router.post("/signin", validate(signinSchema), UserController.signIn);
router.get("/profile/view", UserController.viewProfile);
router.patch(
  "/profile/edit",
  validate(editProfileSchema),
  UserController.editProfile
);
export default router;
