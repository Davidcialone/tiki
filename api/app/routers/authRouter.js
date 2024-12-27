import { Router } from "express";
import * as authController from "../controllers/authController.js";

export const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
