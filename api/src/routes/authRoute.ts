import express from "express";
import { AuthController } from "@/controllers/auth/authController";
const Controller = new AuthController
const authRouter = express.Router();

authRouter.post("/sign-in", Controller.SignIn)
authRouter.post("/sign-out", Controller.SignOut)
authRouter.post("/register", Controller.Register)

export {authRouter}