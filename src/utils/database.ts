import { Sequelize } from 'sequelize'

const DB_NAME = 'ts-nodejs-todo-mysql'
const USER_NAME = 'root'
const PASSWORD = 'test'

export const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
})
