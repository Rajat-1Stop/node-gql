const { Model, DataTypes } = require('sequelize');
const { Module, Role } = require('../models')

module.exports = (sequelize) => {
    class RoleAction extends Model {
        static associate({ }) {
            
        }
    }

    RoleAction.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        moduleId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Module,
                key: 'id'
            }
        },
        roleId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Role,
                key: 'id'
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'RoleAction',
        tableName: 'role_actions',
        timestamps: true,
    });
    
    return RoleAction;
}