const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");
const multer = require("multer");
const fs = require("fs");
const Papa = require("papaparse");

const memoryStorage = multer.memoryStorage();
const csv = require("csvtojson");

exports.getAddLeadData = (req, res, next) => {
  res.render("workbook/addLeadData");
};

exports.postAddLeadData = (req, res, next) => {
  const file = req.file;
  const staticDropdownData = {
    source: "669258512f5aaf7d9cb3cd56",
    agent_name: "6692586f2f5aaf7d9cb3cd58",
    language: "669258992f5aaf7d9cb3cd5a",
    disease: "669258db2f5aaf7d9cb3cd5c",
    state: "6692594c2f5aaf7d9cb3cd5e",
    remark: "669259862f5aaf7d9cb3cd60",
  };

  csv()
    .fromFile(`public/files/${file.filename}`)
    .then((jsonObj) => {
      const savePromises = jsonObj.map((item) => {
        const commonFields = {
          source: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.source
            ),
            value: item["Source"],
          },
          date: Date.now(),
          CM_First_Name: item["CM First Name"],
          CM_Last_Name: item["CM Last Name"],
          CM_Phone: item["CM Phone"],
          alternate_Number: item["Alternate Number"],
          agent_name: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.agent_name
            ),
            value: item["Agent Name"],
          },
          language: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.language
            ),
            value: item["Language"],
          },
          disease: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.disease
            ),
            value: item["Disease"],
          },
          age: item["Age"],
          height: item["Height"],
          weight: item["Weight"],
          state: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.state
            ),
            value: item["State"],
          },
          city: item["City/District"],
          remark: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.remark
            ),
            value: item["Remark"],
          },
          comment: item["Comment"],
        };

        const leadData = new Lead(commonFields);

        return leadData.save().then((savedLead) => {
          // Save to Workbook collection
          const workbookData = new Workbook({
            data: {
              dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id), // Assuming data_dd_id is part of the request
              value: "Lead",
            },
            date: Date.now(),
            dataId: savedLead._id,
            ...commonFields,
          });

          return workbookData.save();
        });
      });

      // Wait for all operations to complete
      Promise.all(savePromises)
        .then(() => {
          res.redirect("/incoming"); // Redirect after processing all entries
        })
        .catch((error) => {
          console.log("Error processing data:", error);
          res.status(500).send("Error processing data");
        });
    })
    .catch((error) => {
      console.log("Error processing CSV file:", error);
      res.status(500).send("Error processing file");
    });
};

exports.getLeadData = (req, res, next) => {
  Lead.find({ isDeleted: false })
    .then((data) => {
      // console.log(data)
      res.render("workbook/lead", { data: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteLeadItem = (req, res, next) => {
  const dataId = req.body.dataId;

  // Ensure dataId is not an empty string or invalid ObjectId
  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    console.error("Invalid dataId:", dataId);
    return res.status(400).send("Invalid dataId");
  }

  const objectId = new mongoose.Types.ObjectId(dataId);

  // Update the Incoming document to mark as deleted
  Lead.updateOne({ _id: objectId }, { isDeleted: true })
    .then(() => {
      console.log("Lead item deleted");
      // Update the Workbook document to mark as deleted
      return Workbook.updateOne({ dataId: objectId }, { isDeleted: true });
    })
    .then(() => {
      console.log("Deleted workbook item");
      res.redirect("/workbook");
    })
    .catch((error) => {
      console.error("Error during deletion:", error);
      res.status(500).send("An error occurred");
    });
};