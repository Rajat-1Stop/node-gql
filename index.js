require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./src/application/graphql/schemas');
const { resolvers } = require('./src/application/graphql/resolvers');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(
    cors({
        origin: '*',
    })
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => { return true; }
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}).catch(err => {
    console.error('Error starting server:', err);
});
