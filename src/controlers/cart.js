import fs from 'fs/promises'
import path from 'path'

const dataPath = path.resolve('models', 'cart.json')

const readCartData = async () => {
  const data = await fs.readFile(dataPath, 'utf8')
  return JSON.parse(data)
}

const writeCartsData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
}
const getCars = async () => {
  try {
    const cars = await readCartData()

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
    const cars = await readCartData()
    const carId = Number(id)
    const car = cars.find((item) => item.id === carId)
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
    const cars = await readCartData()
    const carId = Number(id)
    const car = getCarById(carId)

    const carItem = car.products.find((item) => item.product === productId)

    if (!carItem) {
      cars.push({ product: productId, qantity })

      await writeCartsData(cars)
    } else {
      carItem.qantity += qantity
    }
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}

export { getCars, getCarById, addProductToTheCar }
