import express from 'express'

const router = express.Router()

router.route('/').get((_req, _res) => {
  return _res.json({ message: 'Products!' })
})

export { router as productsRoute }
