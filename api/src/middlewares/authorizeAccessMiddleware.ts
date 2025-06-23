import { Request, Response, NextFunction } from "express";

type AccessType = 'can_read' | 'can_write' | 'can_delete';

export const AuthorizeAccess = (module: number, accessType: AccessType) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const permissions = req.permission?.find(m => m.module_id == module)

        if (!permissions || permissions[accessType] != true) {
            res.status(500).json({ message: `Access Denied: you dont have permission (${accessType}) for this module (module: ${module})`, })
        }
        next();
    }
}