const express=require('express')

const router=express.Router()


const incomingController=require('../../controllers/workbook/incoming')

router.get('/addIncomingData',incomingController.getAddIncomingData)

router.post('/addIncomingData',incomingController.postAddIncomingData)

router.get('/incoming',incomingController.getIncomingData)

router.post('/deleteIncomingItem',incomingController.deleteIncomingItem)


module.exports = router;
