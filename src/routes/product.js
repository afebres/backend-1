import express from 'express'
const router = express.Router()

import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
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


router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.pid, req.body)
    if (updatedProduct) {
      res.json(updatedProduct)
    } else {
      res.status(404).send('Producto no encontrado')
    }
  } catch (error) {
    res.status(500).send('Error')
  }
})

router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.pid)
    if (deletedProduct) {
      res.json(deletedProduct)
    } else {
      res.status(404).send('Producto no encontrado')
    }
  } catch (error) {
    res.status(500).send('Error')
  }
})
export default router
