import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/dbConfig';
import { userIFC } from '@/interfaces/user/userIFC';

class User extends Model implements userIFC {
    declare id: number
    declare uid: string
    declare name: string
    declare email: string
    declare status: number // 0: active, 1: inactive
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    uid: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // 0: active, 1: inactive
    }

}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
})

export { User }