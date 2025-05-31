import express from 'express'
const router = express.Router()
import { detaildProduct } from '../controller/allproduct.controller.js'
import { findCategory } from '../controller/allproduct.controller.js'
import asyncWrap from '../utils/Asyncwrap.js'
import {allproducts} from '../controller/allproduct.controller.js'
import { search } from '../controller/allproduct.controller.js'

router.get("/products/search", asyncWrap(search))
router.get("/products/:category", asyncWrap(findCategory))
router.get("/products/detaildProduct/:id", asyncWrap(detaildProduct))
router.get("/allproducts/product", asyncWrap(allproducts))



export default router