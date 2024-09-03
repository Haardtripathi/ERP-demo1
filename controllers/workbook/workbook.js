const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");

exports.getIndex = (req, res, next) => {
  res.render("workbook/index");
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getAddWorkbookData = (req, res, next) => {
  Dropdown.find()
    .then((data) => {
      // console.log(data)
      data.map((item) => ({
        name: item.name,
        values: item.values,
      }));
      return data;
    })
    .then((data) => {
      // console.log(data)
      res.render("workbook/addWorkbookData", { dropdowns: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getWorkbook = (req, res, next) => {
  Workbook.find({ isDeleted: false })
    .then((data) => {
      // console.log(data)
      res.render("workbook/workbook", { data: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.deleteWorkbookItem = (req, res, next) => {
  const dataId = req.body.dataId;
  const itemId = req.body.itemId;
  const dataValue = req.body.dataValue;
  console.log(dataValue);

  if (dataValue == "Incoming") {
    Incoming.updateOne({ _id: dataId }, { isDeleted: true })
      .then(() => {
        console.log("incoming deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (dataValue == "Lead") {
    Lead.updateOne({ _id: dataId }, { isDeleted: true })
      .then(() => {
        console.log("Lead deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  Workbook.updateOne({ _id: itemId }, { isDeleted: true })
    .then(() => {
      console.log("Deleted workbook item");
      res.redirect("/workbook");
    })
    .catch((error) => {
      console.log(error);
    });
};
