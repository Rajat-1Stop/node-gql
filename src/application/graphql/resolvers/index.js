const roleResolver = require('./role.resolver');
// const userResolver = require('./user.resolver');

const resolvers = {
    ...roleResolver
}

module.exports = { resolvers };