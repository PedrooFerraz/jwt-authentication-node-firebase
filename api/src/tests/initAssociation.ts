// src/models/initAssociations.ts
import { testPermissionModel } from '@/tests/user/testPermissionModel';
import { Module } from '@/models/user/moduleModel';
import { Permission } from '@/models/user/permissionModel';
import { Users } from '@/models/user/userModel';
import { testUserModel } from './user/testUserModel';
import { testModuleModel } from './user/testModuleModel';

export function initAssociations() {
  Users.hasMany(Permission, { foreignKey: 'user_id', as: 'permissions' });
  Permission.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });

  Module.hasMany(Permission, { foreignKey: 'module_id', as: 'permissions' });
  Permission.belongsTo(Module, { foreignKey: 'module_id', as: 'modules' });
}

initAssociations()

testUserModel()
testPermissionModel()