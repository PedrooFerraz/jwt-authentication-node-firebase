import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/dbConfig';

class Module extends Model {
    declare id: number
    declare name: string
}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: false,
})

export { Module }