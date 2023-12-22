const authResolver = require('./auth.resolver');
const roleResolver = require('./role.resolver');
const userResolver = require('./user.resolver');

const { mergeResolvers } = require('@graphql-tools/merge');

const resolvers = mergeResolvers([
    authResolver, 
    roleResolver,
    userResolver
]);

module.exports = { resolvers };