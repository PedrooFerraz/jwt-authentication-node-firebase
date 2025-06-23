import { Request, Response } from "express";
import { PermissionService } from "@/services/user/permission.service";

const Service = new PermissionService();

export class PermissionController {
    async getPermissionsByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const permission = await Service.getPermissionsByUserId(Number(userId));
            res.status(200).json(permission)
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async getPermissionsByModuleId(req: Request, res: Response) {
        try {
            const { moduleId } = req.params
            const permission = await Service.getPermissionsByModuleId(Number(moduleId))
            res.status(200).json(permission)
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async createPermission(req: Request, res: Response) {
        try {
            const permission = await Service.createPermission(req.body)
            res.status(200).json(permission)
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    async updatePermission(req: Request, res: Response) {
        try {
            const data = req.body
            const permission = await Service.updatePermission(data)
            res.status(200).json(permission)
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }
}
