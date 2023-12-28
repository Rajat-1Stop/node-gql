const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Role extends Model {
        static associate({ }) {
            
        }
    }

    Role.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,        
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false
    });
    
    return Role;
}