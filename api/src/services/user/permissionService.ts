import { Permission } from "@/models/user/permission.model";
import { PermissionIFC, PermissionServiceIFC } from "@/interfaces/user/permission.interface";

export class PermissionService  implements PermissionServiceIFC {

    async getPermissionsByUserId(userId: number): Promise<PermissionIFC[]> {
        return Permission.findAll({ where: { user_id: userId } });
    }

    async getPermissionsByModuleId(moduleId: number): Promise<PermissionIFC[]> {
        return Permission.findAll({ where: { module_id: moduleId } });
    }

    async createPermission(permission: Partial<PermissionIFC>): Promise<PermissionIFC> {
        return Permission.create(permission);
    }

    async updatePermission(permission: PermissionIFC): Promise<PermissionIFC> {
        const existingPermission = await Permission.findByPk(permission.user_id);
        if (existingPermission) {
            await existingPermission.update(permission);
            return existingPermission;
        }
        throw new Error("Permission not found");
    }

}