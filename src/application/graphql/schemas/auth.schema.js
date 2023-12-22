const { gql } = require('apollo-server-express')

const authDefs = gql`
    scalar DateTime

    type User {
        id: ID!
        firstName: String
        lastName: String
        name: String
        email: String
        phone: String
        phone2: String
        image: String
        imageUrl: String
        gender: Int
        dateOfBirth: DateTime
        isActive: Boolean!
        createdAt: DateTime
    }

    input registerInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        phone2: String
        image: String!
        gender: Int
        dateOfBirth: DateTime!
        password: String!
        confirmPassword: String!
        isActive: Boolean
    }

    input loginInput {
        email: String!
        password: String!
    }

    type Mutation {
        loginUser(data: loginInput!): User
        registerUser(data: registerInput!): User
    }
`;

module.exports = authDefs;