import express from 'express'
import productRoutes from './src/routes/product.js'
import carRoutes from './src/routes/cart.js'

const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API!')
})
app.use('/api/product', productRoutes)
app.use('/api/car', carRoutes)


const server = app.listen(PORT, () => {
  console.log(`Server port ${PORT}`)
})
