import express from 'express'
const router = express.Router()
import {loginOrSignup, checkLogin} from '../controller/auth.controller.js'
import asyncWrap from '../utils/Asyncwrap.js'
import { logout } from '../controller/auth.controller.js'

router.post("/loginOrSignup", asyncWrap(loginOrSignup))
router.get('/checkLogin', asyncWrap(checkLogin))
router.get('/logout', logout)


export default router