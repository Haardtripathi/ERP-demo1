const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Pending = require("../../models/pending");

exports.getPendingData = (req, res, next) => {
  Pending.find({ isDeleted: false })
    .then((data) => {
      res.render("section2/pending", { data: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postShiftToPendingData = (req, res, next) => {};
