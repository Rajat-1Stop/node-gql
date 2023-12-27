const AuthService = require('./auth.service');
const RoleService = require('./role.service');
const UserService = require('./user.service');
const PermissionService = require('./permission.service');

module.exports = { 
    ...AuthService,
    ...RoleService,
    ...UserService,
    ...PermissionService 
};