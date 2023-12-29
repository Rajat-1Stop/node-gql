const { gql } = require('apollo-server-express');

const permissionDefs = gql`
    scalar DateTime

    type Module {
        id: ID!
        name: String!
        isActive: Boolean!
    }

    type ActionType {
        id: ID!
        name: String!
        description: String
    }

    type RoleAction {
        id: ID!
        roleId: Int!
        moduleId: Int!
        isActive: Boolean!
        createdAt: DateTime
    }

    type UserAction {
        id: ID!
        userId: Int!
        actionId: Int!
        isActive: Boolean!
        createdAt: DateTime
    }

    input RoleActionInput {
        roleId: Int!
        moduleId: Int!
        isActive: Boolean
    }

    input UserActionInput {
        userId: Int!
        actionId: Int!
        isActive: Boolean
    }

    type Mutation {
        roleAction(data: RoleActionInput!): RoleAction
        userAction(data: UserActionInput!): UserAction
    }
`;

module.exports = permissionDefs;
