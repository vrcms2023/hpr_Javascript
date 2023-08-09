import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as contausController from '../controllers/contactusController.js'

const router = express.Router()

router.post('/updateContactDetails', contausController.saveContactusDetails )

export default router
