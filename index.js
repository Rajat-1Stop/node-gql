require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { auth } = require('./src/application/middleware')
const { ErrorHandler } = require('./src/infrastructure/handler');
const { typeDefs } = require('@sequelize/application/graphql/schemas');
const { resolvers } = require('@sequelize/application/graphql/resolvers');

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
// app.use(auth);
app.use(ErrorHandler);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || null;

        if(token){
            return await auth(token);
        }

        return null;
    },
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
