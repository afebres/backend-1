import express from 'express'
const router = express.Router()

import {
  getProducts,
  getProductById,
  addProduct,
} from '../controlers/product.js'

router.get('/', async (req, res) => {
  try {
    const products = await getProducts()
    res.json(products)
  } catch (error) {
    res.status(500).send('Error')
  }
})

router.get('/:pid', async (req, res) => {
  try {
    const product = await getProductById(req.params.pid)
    if (product) {
      res.json(product)
    } else {
      res.status(404).send('Producto no encontrado')
    }
  } catch (error) {
    res.status(500).send('Error')
  }
})

router.post('/', async (req, res) => {
  try {
    const newProduct = await addProduct(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).send('Error')
  }
})

router.delete('/', async (req, res) => {})

router.put('/', async (req, res) => {})
export default router
