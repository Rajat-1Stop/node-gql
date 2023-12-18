const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url}`);
});
