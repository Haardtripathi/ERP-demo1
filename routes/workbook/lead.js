const express=require('express')

const router=express.Router()


const incomingController=require('../../controllers/workbook/lead')

router.get('/addLeadData',incomingController.getAddLeadData)

router.post('/addLeadData',incomingController.postAddLeadData)

// router.get('/incoming',incomingController.getIncomingData)


module.exports = router;
