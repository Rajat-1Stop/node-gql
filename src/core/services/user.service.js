const bcrypt = require('bcrypt');
const { getTime } = require('date-fns');
const { User } = require('../models');
const { 
    uploadSingle
} = require('../../infrastructure/utils');
const { ApiError } = require('../../infrastructure/handler');

const getUsers = async (data) => {
    try {
        const {page, rowsPerPage, order, orderBy} = data;

        const sortOptions = [
            [orderBy, order]
        ];

        const paginationOptions = {
            limit: rowsPerPage,
            offset: (page - 1) * rowsPerPage
        };

        const users = await User.findAll({
            order: sortOptions,
            limit: paginationOptions.limit,
            offset: paginationOptions.offset,
        });
        
        return users;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw ApiError.internal("User not found.");
        }

        return user;
    } catch (error) {
        next(ApiError.badRequest(`User View === ${error.message}`));
        return;
    }
}

const createUser = async (data) => {
    try {
        const { email, firstName } = data;
        
        data.password = await bcrypt.hash(`${firstName}@123`, 10);

        // Verify the email is exist
        const checkUnique = await User.findOne({ where: { email: email } });
        if (checkUnique) {
            throw ApiError.badRequest('Email already exists');
        }
        
        const userData = await User.create(data);
        const user = await User.findByPk(userData.id);
        return user;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const updateUser = async (id, data) => {
    try {
        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            throw ApiError.internal("User not found.");
        }        
        
        const updatedUser = await userToUpdate.update(data);
        return updatedUser;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

const deleteUser = async (id) => {
    try {
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            throw ApiError.internal("User not found.");
        }
        await userToDelete.destroy();
        
        return userToDelete;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};