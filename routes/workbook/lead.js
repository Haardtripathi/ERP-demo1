const express = require("express");

const router = express.Router();

const leadController = require("../../controllers/workbook/lead");

router.get("/addLeadData", leadController.getAddLeadData);

router.post("/addLeadData", leadController.postAddLeadData);

router.get("/lead", leadController.getLeadData);

router.post("/deleteLeadItem", leadController.deleteLeadItem);

router.get("/EditLeadItem/:id",leadController.getEditLeadItem)

router.post("/EditLeadItem/",leadController.postEditLeadItem)

module.exports = router;
