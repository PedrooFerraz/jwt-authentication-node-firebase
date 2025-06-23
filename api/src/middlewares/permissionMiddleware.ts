import { Request, Response, NextFunction } from 'express';
import { PermissionService } from '@/services/user/permissionService';
import { UserService } from '@/services/user/userService';
const permissionService = new PermissionService()
const userService = new UserService()

export const permissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const Uid = req.user;

    if (!Uid) {
        return res.status(400).json({ error: "Uid not provided" })
    }

    const user = await userService.getUserByUid(Uid);

    if (!user) {
        return res.status(400).json({ error: "User logged UID not indentified" })
    }

    try {
        const permission = await permissionService.getPermissionsByUserId(user?.id)
        req.permission = permission
        next()

    } catch (e: any) {
        return res.status(500).json({ error: e.message })
    }
}