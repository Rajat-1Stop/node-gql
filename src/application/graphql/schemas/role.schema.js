const { gql } = require('apollo-server-express');

const roleDefs = gql`
    type Role {
        id: ID!
        name: String
        isActive: Boolean!
    }

    type Query {
        role(id: ID!): Role
        roles: [Role]
    }

    input RoleInput {
        name: String!
        # Add other fields if required for create/update operations
    }

    type Mutation {
        createRole(data: RoleInput!): Role
        updateRole(id: ID!, data: RoleInput!): Role
        deleteRole(id: ID!): Role
    }
`;

module.exports = roleDefs;
