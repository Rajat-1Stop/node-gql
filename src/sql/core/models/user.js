const bcrypt = require('bcrypt');
const { getTime } = require('date-fns');
const { APP_URL } = require('@src/config');
const { Model, DataTypes } = require('sequelize');
const { 
    convertToUTC,
    uploadSingle
} = require('@sql/infrastructure/utils');

module.exports = (sequelize) => {
    class User extends Model {
        static associate({ UserRole }) {
            User.hasOne(UserRole, { as: 'userRole', foreignKey: 'userId', onDelete: 'CASCADE' });
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
        getterMethods: {
            imageUrl() {
                if (this.image) {
                    return `${APP_URL}/uploads/User/${this.image}`; 
                }
                return null;
            }
        },
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
            if(user.dateOfBirth) {
                user.dateOfBirth = convertToUTC(user.dateOfBirth);
            }
        }

        if (user.changed('image')) {
            const matches = user.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches || matches.length === 3) {
                const fileName = `${getTime(new Date())}_${Math.floor(1000 + Math.random() * 9000)}.jpeg`
                const uploaded = uploadSingle({
                    file: matches,
                    folder: 'User',
                    fileName: fileName,
                });
                if (uploaded) {
                    user.image = fileName;
                }
            }
        }
    });

    // Verify request password with user password
    User.prototype.checkPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
    
    return User;
}