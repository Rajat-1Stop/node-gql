const { gql } = require('apollo-server-express');

const roleDefs = gql`
    type Role {
        id: ID!
        name: String
        isActive: Boolean!
    }

    input QueryInput {
        rowsPerPage: Int
        page: Int
        order: String!
        orderBy: String!
    }

    type Query {
        role(id: ID!): Role
        roles(data: QueryInput!): [Role]
    }

    input RoleInput {
        name: String!
    }

    type Mutation {
        createRole(data: RoleInput!): Role
        updateRole(id: ID!, data: RoleInput!): Role
        deleteRole(id: ID!): Role
    }
`;

module.exports = roleDefs;
