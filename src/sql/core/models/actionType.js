const { Model, DataTypes } = require('sequelize');

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
            type: DataTypes.ENUM('List', 'View', 'Insert', 'Update', 'Delete'),
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