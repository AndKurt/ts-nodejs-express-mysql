import express from 'express'
import path from 'path'
import { todoRouter } from './routes/todo'
import { sequelize } from './utils/database'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(express.json())
app.use('/api/todo', todoRouter)
app.use((req, res, next) => {
  res.sendFile('/index.html')
})

const start = async () => {
  try {
    //await sequelize.sync({ force: true })
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Start server on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
