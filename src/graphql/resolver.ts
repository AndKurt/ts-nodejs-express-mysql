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
}
