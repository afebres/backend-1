import express from 'express'
import fs from 'fs/promises'
import path from 'path'

const dataPath = path.resolve('models', 'products.json')

const readProductsData = async () => {
  const data = await fs.readFile(dataPath, 'utf8')
  return JSON.parse(data)
}

const writeProductsData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
}
const getProducts = async () => {
  try {
    const products = await readProductsData()
    if (products) {
      return products
    } else {
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const getProductById = async (id) => {
  try {
    const products = await readProductsData()
    const productId = Number(id)
    const product = products.find((item) => item.id === productId)
    if (product) {
      return product
    } else {
      console.log(`Producto no encontrado`)
      return null
    }
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

const addProduct = async (product) => {
  try {
    const products = await readProductsData()
    const maxId = products.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    )
    const newId = maxId + 1

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails || [],
    }

    products.push(newProduct)
    await writeProductsData(products)
    console.log('Product agregado:', newProduct)
    return newProduct
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const updateProduct = async (id, updatedProduct) => {
  try {
    const products = await readProductsData()
    const productId = Number(id)
    const productIndex = products.findIndex((item) => item.id === productId)
    console.log('productIndex', productIndex)
    if (productIndex !== -1) {
      const product = products[productIndex]
      products[productIndex] = { ...product, ...updatedProduct }
      console.log('Producto actualizado:', products[productIndex])
      await writeProductsData(products)
      return products[productIndex]
    } else {
      console.log(`Producto no encontrado`)
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const deleteProduct = async (id) => {
  try {
    const products = await readProductsData()
    const productId = Number(id)
    const productIndex = products.findIndex((item) => item.id === productId)

    if (productIndex !== -1) {
      const [deletedProduct] = products.splice(productIndex, 1)
      await writeProductsData(products)
      console.log('Producto eliminado', deletedProduct)
      return deletedProduct
    } else {
      console.log(`Producto no encontrado`)
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
export { getProducts, getProductById, addProduct, updateProduct, deleteProduct }
