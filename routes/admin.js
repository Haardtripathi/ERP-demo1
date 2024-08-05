const express=require('express')
const path=require('path')

const router=express.Router()

const adminController=require('../controllers/admin')

router.get('/addDropdown',adminController.getAddDropdown)
router.post('/addDropdown',adminController.postAddDropdown)

module.exports = router;
