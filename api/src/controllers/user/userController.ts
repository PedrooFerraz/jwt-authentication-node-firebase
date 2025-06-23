import { UserService } from "@/services/user/user.service";
import { Request, Response } from "express";
const Service = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await Service.getAllUser();
            res.status(200).json(users);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const user = await Service.getUserById(Number(req.params.id));
            res.json(user);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = await Service.createUser(req.body);
            res.status(201).json(newUser);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await Service.updateUser(Number(req.params.id), req.body);
            res.json(updatedUser);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async desactiveUser(req: Request, res: Response) {
        try {
            await Service.desactiveUser(Number(req.params.id));
            res.sendStatus(204);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async reactivateUser(req: Request, res: Response) {
        try {
            await Service.reactivateUser(Number(req.params.id));
            res.sendStatus(204);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const user = await Service.getUserByEmail(req.params.email);
            res.json(user);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }
    async getUserByUid(req: Request, res: Response) {
        try {
            const user = await Service.getUserByUid(req.params.uid);
            res.json(user);
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }
};