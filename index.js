const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./src/application/graphql/schemas');
const { resolvers } = require('./src/application/graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url}`);
});
