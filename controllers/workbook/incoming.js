const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");

exports.getAddIncomingData = (req, res, next) => {
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
      res.render("workbook/addIncomingData", { dropdowns: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.postAddIncomingData = (req, res, next) => {
  const commonFields = {
    source: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.source_dd_id),
      value: req.body.Source,
    },
    CM_First_Name: req.body.cmFirstName,
    CM_Last_Name: req.body.cmLastName,
    CM_Phone: req.body.cmphone,
    alternate_Phone: req.body.cmPhoneAlternateNumber,
    agent_name: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.agent_dd_id),
      value: req.body["Agent Name"],
    },
    language: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.language_dd_id),
      value: req.body.Language,
    },
    disease: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.disease_dd_id),
      value: req.body.Disease,
    },
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    state: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.state_dd_id),
      value: req.body.State,
    },
    city: req.body.city,
    remark: {
      dropdown_data: new mongoose.Types.ObjectId(req.body.remark_dd_id),
      value: req.body.Remark,
    },
    comment: req.body.comment,
  };

  const incomingData = new Incoming(commonFields);

  incomingData
    .save()
    .then((result) => {
      console.log("Saved in incoming");

      return incomingData._id;
    })
    .then((DataId) => {
      const workbookData = new Workbook({
        data: {
          dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id),
          value: "Incoming",
        },
        dataId: DataId,
        ...commonFields,
      });

      return workbookData.save();
    })
    .then((result) => {
      res.redirect("/incoming");
    })
    .catch((error) => {
      console.log(error);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getIncomingData = (req, res, next) => {
  Incoming.find({ isDeleted: false })
    .then((data) => {
      // console.log(data)
      res.render("workbook/incoming", { data: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.deleteIncomingItem = (req, res, next) => {
  const dataId = req.body.dataId;

  // Ensure dataId is not an empty string or invalid ObjectId
  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    console.error("Invalid dataId:", dataId);
    return res.status(400).send("Invalid dataId");
  }

  const objectId = new mongoose.Types.ObjectId(dataId);

  // Update the Incoming document to mark as deleted
  Incoming.updateOne({ _id: objectId }, { isDeleted: true })
    .then(() => {
      console.log("Incoming item deleted");
      // Update the Workbook document to mark as deleted
      return Workbook.updateOne({ dataId: objectId }, { isDeleted: true });
    })
    .then(() => {
      console.log("Deleted workbook item");
      res.redirect("/incoming");
    })
    .catch((error) => {
      console.error("Error during deletion:", error);
      res.status(500).send("An error occurred");
    });
};
