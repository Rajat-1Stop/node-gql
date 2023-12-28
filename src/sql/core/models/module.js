const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Module extends Model {
        static associate({ }) {
            
        }
    }

    Module.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Module',
        tableName: 'modules',
        timestamps: false
    });
    
    return Module;
}