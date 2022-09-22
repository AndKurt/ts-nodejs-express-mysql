import { DataType } from 'sequelize-typescript'
import { sequelize } from '../utils/database'

export const todo = sequelize.define('Todo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  },
  done: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
})
