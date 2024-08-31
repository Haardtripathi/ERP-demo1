const express = require("express");
const pendingController = require("../../controllers/section2/pending");

const router = express.Router();

router.get("/pending", pendingController.getPendingData);

router.post("/shiftToPending", pendingController.postShiftToPendingData);

router.get("/pendingForm/:id", pendingController.getPendingForm);

router.post("/editPending", pendingController.postEditPending);

module.exports = router;
