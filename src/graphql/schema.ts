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


  input UserInput {
    name: String!
    email: String!
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    createdAt: String
    updatedAt: String
  }
  
  type Query {
    test: TestType!
    random(min: Int!, max: Int!, count: Int!): [Float!]!
    getTodos: [Todo!]!
  }

  input TodoInput {
    title: String!
  }

  type Mutation {
    addTestUser(user: UserInput!): User!
    createTodo(todo: TodoInput!): Todo!
    completeTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`)
