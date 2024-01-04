const { ApiError } = require('@sql/infrastructure/handler');
const { UserRole, RoleAction, UserAction } = require('@sql/core/models');

// Create auth middleware to check token from client
const permission = async (user, action) => {
    try {
        const userRole = await UserRole.findOne({ where: { userId: user.id } });
        console.log("=== User Role === ", userRole);
        
        return true;
    } catch (error) {
        throw ApiError.internal(error.message);
    }
};

module.exports = {permission};