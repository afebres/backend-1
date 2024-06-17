import express from 'express'
const router = express.Router()
import { getCars, getCarById } from '../controlers/cart.js'


router.get('/', async (req, res) => {
  try {
    const cars = await getCars()
    res.json(cars)
  } catch (error) {
    res.status(500).send('Error')
  }
})
router.get('/:cid', async (req, res) => {
  try {
    const car = await getCarById()
    res.json(car)
  } catch (error) {
    res.status(500).send('Error')
  }
})


export default router
