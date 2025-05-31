import express from 'express'
const router = express.Router()
import deleted from '../controller/userdelete.controller.js'
import asyncWrap from '../utils/Asyncwrap.js'


router.delete("/user-delete", asyncWrap(deleted))

export default router;