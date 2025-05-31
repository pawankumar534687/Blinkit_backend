import express from 'express'
const router = express.Router()
import {sendOTP, verifyOtp, checkLogin} from '../controller/auth.controller.js'
import asyncWrap from '../utils/Asyncwrap.js'
import { logout } from '../controller/auth.controller.js'

router.post('/send-otp', asyncWrap(sendOTP))
router.post('/verifyOtp', asyncWrap(verifyOtp))
router.get('/checkLogin', checkLogin)
router.get('/logout', logout)


export default router