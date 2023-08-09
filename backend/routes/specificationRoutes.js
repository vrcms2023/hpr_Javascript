import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as specificationController from '../controllers/specificationController.js'

const router = express.Router()

router.route('/addAndUpdateSpecifications').post(protect, specificationController.addAndUpdateSpecifications)
router.route('/getSpecificationsById/:id').get(protect, specificationController.getSpecificationsById)

export default router
