const authDefs = require('./auth.schema');
const roleDefs = require('./role.schema');
const userDefs = require('./user.schema');

const { mergeTypeDefs } = require('@graphql-tools/merge');

const typeDefs = mergeTypeDefs([
    authDefs,
    roleDefs,
    userDefs
])

module.exports = { typeDefs };