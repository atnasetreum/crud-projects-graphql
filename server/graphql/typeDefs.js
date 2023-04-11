import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    projects: [Project]
    project(_id: ID!): Project
  }

  type Project {
    _id: ID!
    name: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createProject(name: String!, description: String): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    removeProject(_id: ID!): Project
  }
`;
