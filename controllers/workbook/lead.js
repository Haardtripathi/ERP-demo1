const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");
const multer = require("multer");
const fs = require("fs");

const memoryStorage = multer.memoryStorage();
const csv = require("csvtojson");
const lead = require("../../models/lead");
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getAddLeadData = (req, res, next) => {
  res.render("workbook/addLeadData");
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
          CM_First_Name: item["CM First Name"],
          CM_Last_Name: item["CM Last Name"],
          CM_Phone: item["CM Phone"],
          alternate_Phone: item["Alternate Number"],
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
          },
          disease: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.disease
            ),
          },
          state: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.state
            ),
          },
          remark: {
            dropdown_data: new mongoose.Types.ObjectId(
              staticDropdownData.remark
            ),
          },
        };

        const leadData = new Lead(commonFields);

        return leadData.save().then((savedLead) => {
          // Save to Workbook collection
          const workbookData = new Workbook({
            data: {
              dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id), // Assuming data_dd_id is part of the request
              value: "Lead",
            },
            dataId: savedLead._id,
            date: savedLead.date,
            ...commonFields,
          });

          return workbookData.save();
        });
      });

      // Wait for all operations to complete
      Promise.all(savePromises)
        .then(() => {
          res.redirect("/lead"); // Redirect after processing all entries
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

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
      res.redirect("/lead");
    })
    .catch((error) => {
      console.error("Error during deletion:", error);
      res.status(500).send("An error occurred");
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getEditLeadItem = (req, res, next) => {
  const itemId = req.params.id;
  // console.log(itemId)
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
      Lead.findOne({ _id: itemId })
        .then((leadData) => {
          console.log(leadData);
          res.render("workbook/editLeadItem", {
            leadData: leadData,
            dropdowns: data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.postEditLeadItem = (req, res, next) => {
  const dataId = req.body.dataId;
  const commonFields = {
    source: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.source_dd_id),
      value: req.body.source,
    },
    CM_First_Name: req.body.cmFirstName,
    CM_Last_Name: req.body.cmLastName,
    CM_Phone: req.body.cmphone,
    alternative_Number: req.body.cmPhoneAlternateNumber,
    agent_name: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.agent_dd_id),
      value: req.body.agent_name,
    },
    language: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.language_dd_id),
      value: req.body.language,
    },
    disease: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.disease_dd_id),
      value: req.body.disease,
    },
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    state: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.state_dd_id),
      value: req.body.state,
    },
    city: req.body.city,
    remark: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.remark_dd_id),
      value: req.body.remark,
    },
    comment: req.body.comment,
  };

  Lead.findById(dataId)
    .then((item) => {
      item.source = commonFields.source;
      item.CM_First_Name = commonFields.CM_First_Name;
      item.CM_Last_Name = commonFields.CM_Last_Name;
      item.CM_Phone = commonFields.CM_Phone;
      item.alternative_Number = commonFields.alternative_Number;
      item.agent_name = commonFields.agent_name;
      item.language = commonFields.language;
      item.disease = commonFields.disease;
      item.age = commonFields.age;
      item.height = commonFields.height;
      item.weight = commonFields.weight;
      item.state = commonFields.state;
      item.city = commonFields.city;
      console.log(item.city);
      item.remark = commonFields.remark;
      item.comment = commonFields.comment;
      item.save();
      return item;
    })
    .then(() => {
      Workbook.findOne({ dataId: dataId })
        .then((item) => {
          item.source = commonFields.source;
          item.CM_First_Name = commonFields.CM_First_Name;
          item.CM_Last_Name = commonFields.CM_Last_Name;
          item.CM_Phone = commonFields.CM_Phone;
          item.alternative_Number = commonFields.alternative_Number;
          item.agent_name = commonFields.agent_name;
          item.language = commonFields.language;
          item.disease = commonFields.disease;
          item.age = commonFields.age;
          item.height = commonFields.height;
          item.weight = commonFields.weight;
          item.state = commonFields.state;
          item.city = commonFields.city;
          item.remark = commonFields.remark;
          item.comment = commonFields.comment;
          console.log(item);
          return item.save();
        })
        .then((result) => {
          console.log("UPDATED PRODUCT!");
          res.redirect("/lead");
        });
    })

    .catch((err) => {
      console.log(err);
    });
};
