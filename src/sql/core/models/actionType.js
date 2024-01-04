const { Model, DataTypes } = require('sequelize');
const { ActionTypes } = require('../enums')

module.exports = (sequelize) => {
    class ActionType extends Model {
        static associate({ }) {
            
        }
    }

    ActionType.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.ENUM(...Object.values(ActionTypes)),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'ActionType',
        tableName: 'action_types',
        timestamps: false
    });
    
    return ActionType;
}