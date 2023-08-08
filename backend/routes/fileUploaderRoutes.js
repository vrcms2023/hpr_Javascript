import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as fileUploaderController from '../controllers/fileUploaderController.js'

const router = express.Router()

router.route('/fileUploader/:id/:name/:category"').post(protect, fileUploaderController.uploadImage)
router.route('/getSelectedImagesById/:id/:category').get(protect, fileUploaderController.getSelectedImageById);
router.route('/deleteImageById/:id').delete(protect, fileUploaderController.deleteSelectedImageById);

export default router
