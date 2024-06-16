import express from 'express'
import { productsData } from '../models/product.js'

const getProducts = async () => {
  try {
    const products = productsData
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
    const productId = Number(id)
    const product = productsData.find((item) => item.id === productId)
    if (product) {
      return product
    } else {
      console.log(`Producto: ${productId} no encontrado`)
      return null
    }
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

const addProduct = async (product) => {
  try {
    const maxId = productsData.reduce(
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

    productsData.push(newProduct)
      console.log('Product agregado:', newProduct)
    return newProduct
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
export { getProducts, getProductById, addProduct }
