const express = require("express");

const router = express.Router();

const workbookController = require("../../controllers/workbook/workbook");

const incomingController = require("../../controllers/workbook/incoming");

router.get("/", workbookController.getIndex);

// router.get('/workbook',workbookController.getWorkbook)
router.get("/addWorkbookData", workbookController.getAddWorkbookData);
// router.post('/addWorkbookData',workbookController.postAddWorkbookData)

// router.post('/addWorkbookData',workbookController.postAddWorkbookData)

router.get("/workbook", workbookController.getWorkbook);

router.post("/deleteWorkbookItem", workbookController.deleteWorkbookItem);

module.exports = router;
