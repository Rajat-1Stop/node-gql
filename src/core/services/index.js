const AuthService = require('./auth.service');
const RoleService = require('./role.service');

module.exports = { 
    ...AuthService,
    ...RoleService 
};