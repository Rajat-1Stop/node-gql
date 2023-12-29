const bcrypt = require('bcrypt');
const { User, Role, UserRole } = require('../models');
const { ApiError } = require('@sql/infrastructure/handler');

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
            include: [
                {
                    model: UserRole,
                    as: 'userRole',
                    include: [
                        { model: Role, as: 'role', },
                    ]
                },
            ],
            group: ['phone'],
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

const assignRole = async (data) => {
    try {
        const userRole = await UserRole.findOne({where: {roleId: data.roleId, userId: data.userId}});
        if (userRole) {
            throw ApiError.internal("Role is already assigned.");
        } 

        const userToAssign = await User.findByPk(data.userId);
        if (!userToAssign) {
            throw ApiError.internal("User not found.");
        }

        const roleToAssign = await Role.findByPk(data.roleId);
        if (!roleToAssign) {
            throw ApiError.internal("Role not found.");
        }
        
        const roleData = await UserRole.create(data);
        const assignement = await UserRole.findByPk(roleData.id);
        return assignement;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    assignRole
};