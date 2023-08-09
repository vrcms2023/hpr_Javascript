import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as fileUploaderController from '../controllers/fileUploaderController.js'

const router = express.Router()

router.post('/fileUploader/:id/:name/:category', fileUploaderController.uploadImage)
router.route('/getSelectedImagesById/:id/:category').get(protect, fileUploaderController.getSelectedImageById);
router.route('/deleteImageById/:id').delete(protect, fileUploaderController.deleteSelectedImageById);

export default router
