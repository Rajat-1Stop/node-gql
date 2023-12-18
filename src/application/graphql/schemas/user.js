const { gql } = require('apollo-server-express')

const userDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Query {
        user(id: ID!): User
    }
`;

module.exports = userDefs;