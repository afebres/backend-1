import { carsData } from '../models/cart.js'
import { carsData } from '../models/cart.js'

const getCars = async () => {
  try {
    const cars = carsData
    if (cars) {
      return cars
    } else {
      return null
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const getCarById = async (id) => {
  try {
    const carId = Number(id)
    const car = carsData.find((item) => item.id === carId)
    if (car) {
      return car
    } else {
      console.log(`No existe este carrito`)
      return null
    }
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

const addProductToTheCar = async (id, productId, qantity = 1) => {
  try {
    const carId = Number(id)
    const car = getCarById(carId)

    const carItem = car.products.find((item) => item.product === productId)

    if (!carItem) {
      car.products.push({ product: productId, qantity })
    } else {
      carItem.qantity += qantity
    }
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export { getCars, getCarById, addProductToTheCar }
