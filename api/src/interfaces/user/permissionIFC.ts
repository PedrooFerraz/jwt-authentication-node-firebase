export interface PermissionIFC {
    user_id: number
    module_id: number
    can_read: boolean
    can_write: boolean
    can_delete: boolean
}

export interface PermissionServiceIFC {
    getPermissionsByUserId(userId: number): Promise<PermissionIFC[]>
    getPermissionsByModuleId(moduleId: number): Promise<PermissionIFC[]>
    createPermission(permission: Partial<PermissionIFC>): Promise<PermissionIFC>
    updatePermission(permission: PermissionIFC): Promise<PermissionIFC>
}