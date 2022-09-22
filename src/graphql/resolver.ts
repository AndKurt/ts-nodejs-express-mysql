import { todo, todo as Todo } from '../models/todo'

const users = [
  { name: 'Andrey', age: 29, email: 'and@test.com' },
  { name: 'Ivan', age: 30, email: 'ivan@test.com' },
]

interface IRandom {
  min: number
  max: number
  count: number
}
interface IUser {
  name: string
  email: string
}

export const resolver = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users,
    }
  },
  random({ min, max, count }: IRandom) {
    const arr = []
    for (let i = 0; i < count; i++) {
      const randomNum = Math.trunc(Math.random() * (max - min) + min)
      arr.push(randomNum)
    }

    return arr
  },

  addTestUser({ name, email }: IUser) {
    const user = {
      name,
      email,
      age: Math.ceil(Math.random() * 30),
    }
    users.push(user)

    return user
  },
  async getTodos() {
    try {
      return await Todo.findAll()
    } catch (error) {
      throw new Error('Fetch todos is not available')
    }
  },
  async createTodo({ todo }: any) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false,
      })
    } catch (error) {
      throw new Error('Title is required')
    }
  },
  async completeTodo({ id }: any) {
    try {
      await Todo.update({ done: true }, { where: { id } })

      const todo = await Todo.findByPk(id)
      return todo
    } catch (error) {
      throw new Error('Something went wrong')
    }
  },
  async deleteTodo({ id }: any) {
    try {
      const todos = await Todo.findAll({
        where: { id },
      })

      await todos[0].destroy()
      return true
    } catch (error) {
      throw new Error('Something went wrong')
    }
  },
}
