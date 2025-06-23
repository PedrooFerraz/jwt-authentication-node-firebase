import { PermissionIFC } from "@/interfaces/user/permissionIFC";

declare global {
    namespace Express {
        interface Request {
            permission?: PermissionIFC[];
            user?: string;
        }
    }
}

export {}