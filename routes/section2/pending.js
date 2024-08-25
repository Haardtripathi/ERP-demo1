const express = require("express");
const pendingController = require("../../controllers/section2/pending");

const router = express.Router();

router.get("/pending", pendingController.getPendingData);

router.post("/shiftToPending", pendingController.postShiftToPendingData);

module.exports = router;
