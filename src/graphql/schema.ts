import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type User {
    name: String!
    age: Int!
    email: String!
  }

  type TestType {
    count: Int!
    users: [User!]!
  }

  type Query {
    test: TestType!
    random(min: Int!, max: Int!, count: Int!): [Float!]!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Mutation {
    addTestUser(user: UserInput!): User!
  }
`)
