const userResolver = require('./user');

const resolvers = {
    ...userResolver
}

module.exports = { resolvers };