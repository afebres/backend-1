import express from 'express'
import productRoutes from './src/routes/product.js'
const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API!')
})
app.use('/api/product', productRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server port ${PORT}`)
})
