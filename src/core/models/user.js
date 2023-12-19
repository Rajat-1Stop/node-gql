const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate({ }) {
            
        }
    }

    User.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,        
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
            description: '1=male, 2=female, 3=other'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            select: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        timestamps: true,
    });

    User.beforeSave(async (user, options) => {
        if (user.changed('firstName') || user.changed('lastName')) {
            if (user.lastName) {
                user.name = `${user.firstName} ${user.lastName}`;
            } else {
                user.name = user.firstName;
            }
        }

        if (user.changed('dateOfBirth')) {
            user.dateOfBirth = null;
        }
    });

    // Verify request password with user password
    User.prototype.checkPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
    
    return User;
}