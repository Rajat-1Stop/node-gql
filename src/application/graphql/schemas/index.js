const roleDefs = require('./role.schema');
// const userDefs = require('./user');

const typeDefs = {
    ...roleDefs
}

module.exports = { typeDefs };