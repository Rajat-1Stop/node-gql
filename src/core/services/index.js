const AuthService = require('./auth.service');
const RoleService = require('./role.service');
const UserService = require('./user.service');

module.exports = { 
    ...AuthService,
    ...RoleService,
    ...UserService 
};