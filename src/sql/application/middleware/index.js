const authMiddleware = require('./auth');
const permissionMiddleware = require('./permission');

module.exports = {
    ...permissionMiddleware,
    ...authMiddleware
}