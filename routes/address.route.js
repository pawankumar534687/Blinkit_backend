import asyncWrap from '../utils/Asyncwrap.js'
import {getAddress} from '../controller/address.controller.js'
import express from 'express'
import { allAddress } from '../controller/address.controller.js'
const router = express.Router()


router.post("/getaddress", asyncWrap(getAddress))
router.get("/alladdress/:userId", asyncWrap(allAddress))

export default router