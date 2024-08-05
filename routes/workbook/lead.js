const express = require("express");

const router = express.Router();

const leadController = require("../../controllers/workbook/lead");

router.get("/addLeadData", leadController.getAddLeadData);

router.post("/addLeadData", leadController.postAddLeadData);

router.get("/lead", leadController.getLeadData);

router.post("/deleteLeadItem", leadController.deleteLeadItem);

module.exports = router;
