const { Model, DataTypes } = require('sequelize');
const { ActionType, User } = require('../models')

module.exports = (sequelize) => {
    class UserAction extends Model {
        static associate({ }) {
            
        }
    }

    UserAction.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        actionId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: ActionType,
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
        modelName: 'UserAction',
        tableName: 'user_actions',
        timestamps: true,
    });
    
    return UserAction;
}