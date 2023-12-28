const authDefs = require('./auth.schema');
const roleDefs = require('./role.schema');
const userDefs = require('./user.schema');
const permissionDefs = require('./permission.schema');

const { mergeTypeDefs } = require('@graphql-tools/merge');

const typeDefs = mergeTypeDefs([
    authDefs,
    roleDefs,
    userDefs,
    permissionDefs
])

module.exports = { typeDefs };