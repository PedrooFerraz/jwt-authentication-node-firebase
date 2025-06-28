import { Request, Response } from "express";
import { AuthService } from "@/services/auth/authService";
import { UserController } from "../user/userController";

const Service = new (AuthService)
const userController = new (UserController)

export class AuthController {
    async SignIn(req: Request, res: Response) {
        const body = await req.body;

        try {
            const cookie = await Service.signIn(body.user, body.password)
            res.setHeader("Set-Cookie", cookie)
            res.status(200).json({ "message": "Successful SignIn" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async SignOut(req: Request, res: Response) {
        const cookie = req.cookies.session
        try {
            await Service.signOut(cookie)

            res.clearCookie('session', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.status(200).json({ "message": "Successful SignOut" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async Register(req: Request, res: Response) {
        const body = await req.body

        try {
            const data = await Service.register(body.email, body.password)
            req.uid = data.user.uid
            req.email = data.user.email ?? undefined
            await userController.createUser(req, res)
            res.status(200).json({ "message": "Successful Register" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

    }


}