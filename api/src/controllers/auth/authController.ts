import { Request, Response } from "express";
import { AuthService } from "@/services/auth/authService";

const Service = new (AuthService)

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

}