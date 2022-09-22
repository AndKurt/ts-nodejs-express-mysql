import { Router, Request, Response } from 'express'
import { IPostTodo } from '../interfaces/todo'
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

todoRouter.put('/:id', (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

todoRouter.delete('/:id', (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
  }
})
