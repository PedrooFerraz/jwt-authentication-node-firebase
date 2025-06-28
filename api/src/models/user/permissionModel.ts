import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/dbConfig';
import { Module } from '@/models/user/moduleModel';
import { Users } from '@/models/user/userModel';
import { PermissionIFC } from '@/interfaces/user/permissionIFC';

class Permission extends Model implements PermissionIFC {
    declare user_id: number
    declare module_id: number
    declare can_read: boolean
    declare can_write: boolean
    declare can_delete: boolean
}

Permission.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        }
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: "id",
        }
    },
    can_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    can_write: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    can_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

}, {
    sequelize, 
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "module_id"]
        }
    ]
})

export { Permission }