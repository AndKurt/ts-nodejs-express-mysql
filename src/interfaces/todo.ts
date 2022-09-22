export interface IPostTodo {
  title: string
  done: boolean
}

export interface ITodo {
  save(): unknown
  dataValues: {
    id: number
    done: boolean
    title: string
    createdAt: Date
    updatedAt: Date
  }
}
