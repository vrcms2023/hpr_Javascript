import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as testimonialController from '../controllers/testimonialController.js'

const router = express.Router()

router.route('/addTestimonial').post(protect, testimonialController.addTestimonial )
router.route('/getTestimonialList').get(protect, testimonialController.getAllTestimonial )
router.route('/updateTestimonial').post(protect, testimonialController.updateTestimonial )
router.route('/deleteSelectedTestimonial/:id').get(protect, testimonialController.deleteTestimonialById)


export default router
