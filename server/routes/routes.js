import express from "express";
import { registerUser } from "../controller/registerUserController.js";
import { checkEmail } from "../controller/checkEmail.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);

export default router;
