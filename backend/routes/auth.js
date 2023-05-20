import express from 'express'
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController, contactusEmail } from '../controllers/auth.js'
import { isAdmin, requireSignIn } from '../middlewares/auth.js'

const router = express.Router()

router.post('/contact-us', contactusEmail)

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/forgot-password', forgotPasswordController)

router.get('/test', requireSignIn, isAdmin, testController)

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController)

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router