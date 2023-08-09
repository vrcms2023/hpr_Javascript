import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as appNewsController from '../controllers/appNewsController.js'

const router = express.Router()

router.route('/addNews').post(protect, appNewsController.addNews )
// router.route('/updateNews').post(protect, appNewsController.updateNews )
// router.get('/getDashboardProject', appNewsController.getDashBoardNews)
// router.route('/getNewsById/:id').get(protect, amenitiesController.getNewsById)
// router.route('/deleteNews/:id').get(protect, amenitiesController.deleteNewsById)
// router.get('/client/getNews', appNewsController.getClientNews)

export default router
