import { Router, Request, Response } from 'express'
import { IPostTodo, ITodo } from '../interfaces/todo'
import { todo as Todo } from '../models/todo'

export const todoRouter = Router()

todoRouter.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll()
    res.status(200).json(todos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

todoRouter.post('/', async (req: Request<{}, {}, IPostTodo>, res: Response) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    })
    res.status(201).json({ todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

todoRouter.put('/:id', async (req: Request<{ id: number }, {}, IPostTodo>, res: Response) => {
  try {
    await Todo.update({ done: req.body.done }, { where: { id: req.params.id } })
    const todo = await Todo.findByPk(req.params.id)

    res.status(200).json({ todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

todoRouter.delete('/:id', async (req: Request<{ id: number }>, res: Response) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: req.params.id,
      },
    })

    const todo = todos[0]
    await todo.destroy()
    res.status(204).json({})
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})
