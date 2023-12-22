const bcrypt = require('bcrypt');
const { getTime } = require('date-fns');
const { User } = require('../models');
const { 
    uploadSingle
} = require('../../infrastructure/utils');
const { ApiError } = require('../../infrastructure/handler');

const login = async (data) => {
    try {
        const { email, password } = data;
        // Check email
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            throw ApiError.badRequest('Email or password is incorrect.');
        }

        // Check password
        const checkPassword = await user.checkPassword(password);
        if (!checkPassword) {
            throw ApiError.badRequest('Email or password is incorrect.');
        }
        
        // Return response to client
        delete user.dataValues.password;
        return user;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const register = async (data) => {
    try {
        const { email, password } = data;
        
        data.password = await bcrypt.hash(password, 10);
        delete data.confirmPassword;

        // Verify the email is exist
        const checkUnique = await User.findOne({ where: { email: email } });
        if (checkUnique) {
            throw ApiError.badRequest('Email already exists');
        }
        
        // Verify the base64 image
        if (data.image) {
            const matches = data.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

            if (matches || matches.length === 3) {
                const fileName = `${getTime(new Date())}_${Math.floor(1000 + Math.random() * 9000)}.jpeg`
                const uploaded = uploadSingle({
                    file: matches,
                    folder: 'User',
                    fileName: fileName,
                });
                if (uploaded) {
                    data.image = fileName;
                }
            }
        }

        const userData = await User.create(data);
        const user = await User.findByPk(userData.id);
        return user;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

module.exports = {
    login,
    register
};