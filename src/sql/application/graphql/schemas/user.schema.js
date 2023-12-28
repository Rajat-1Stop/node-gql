const { gql } = require('apollo-server-express')

const userDefs = gql`
    scalar DateTime

    type Role {
        id: ID!
        name: String!
    }

    type UserRole {
        id: ID!
        role: Role!
        userId: Int!
    }

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
        userRole: UserRole
        createdAt: DateTime
    }

    input QueryInput {
        rowsPerPage: Int
        page: Int
        order: String!
        orderBy: String!
    }

    type Query {
        user(id: ID!): User
        users(data: QueryInput!): [User]
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        phone2: String
        image: String!
        gender: Int
        dateOfBirth: DateTime!
        isActive: Boolean
    }

    input UserRoleInput {
        roleId: Int!
        userId: Int!
    }

    type Mutation {
        createUser(data: UserInput!): User
        updateUser(id: ID!, data: UserInput!): User
        assignRole(data: UserRoleInput!): UserRole
        deleteUser(id: ID!): User
    }
`;

module.exports = userDefs;