const { Model, DataTypes } = require('sequelize');
const { Role, User } = require('../models')

module.exports = (sequelize) => {
    class UserRole extends Model {
        static associate({ }) {
            
        }
    }

    UserRole.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Role,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'UserRole',
        tableName: 'user_roles',
        timestamps: false,
    });
    
    return UserRole;
}