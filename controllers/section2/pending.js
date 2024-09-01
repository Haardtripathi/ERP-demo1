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

exports.postShiftToPendingData = (req, res, next) => {
  const itemId = req.body.itemId;
  const dataId = req.body.dataId;
  const dataValue = req.body.dataValue;

  Workbook.findOne({ _id: itemId }).then((data) => {
    const pendingData = new Pending({
      payment_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca09f9efcae9d04adb3610"),
        value: "-",
      },
      sale_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca09c6efcae9d04adb360e"),
        value: "-",
      },
      agent_name: {
        dropdown_data: data.agent_name.dropdown_data,
        value: data.agent_name.value,
      },
      CM_First_Name: data.CM_First_Name,
      CM_Last_Name: data.CM_Last_Name,
      CM_Phone: data.CM_Phone,
      Alternate_Number: data.alternate_Phone,
      email: "-",
      status: {
        dropdown_data: new mongoose.Types.ObjectId("66cd80b921c654779763c616"),
        value: "-",
      },
      comment: data.comment,
      shipment_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca0a39efcae9d04adb3612"),
        value: "-",
      },
      address: "-",
      post_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca0abfefcae9d04adb3616"),
        value: "-",
      },
      post: "-",
      subDistrict_Taluka: "-",
      City_District: data.city,
      pincode: "-",
      state: {
        dropdown_data: data.state.dropdown_data,
        value: data.state.value,
      },
      disease: {
        dropdown_data: new mongoose.Types.ObjectId("669258db2f5aaf7d9cb3cd5c"),
        value: data.disease.value,
      },
      amount: {
        dropdown_data: new mongoose.Types.ObjectId("66cb7b392d2b09775bd57dfa"),
        value: "-",
      },
      products: {
        dropdown_data: new mongoose.Types.ObjectId("66cb7b9c2d2b09775bd57dfc"),
        value: "-",
      },
      quantity: "-",
    });
    pendingData
      .save()
      .then((result) => {
        console.log("Added to pending");
        Workbook.deleteOne({ _id: itemId })
          .then((result) => {
            console.log("deleted in workbook");
          })
          .then((res) => {
            if (dataValue == "Lead") {
              Lead.deleteOne({ _id: dataId })
                .then((result) => {
                  console.log("deleted in Lead");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Incoming.deleteOne({ _id: dataId })
                .then((result) => {
                  console.log("deleted in Incoming");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
      })
      .then((result) => {
        res.redirect("/pending");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getPendingForm = (req, res, next) => {
  const id = req.params.id;
  Pending.find({ _id: id })
    .populate({
      path: "payment_type.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "sale_type.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "agent_name.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "status.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "shipment_type.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "post_type.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "state.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "disease.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "amount.dropdown_data",
      model: "Dropdown",
    })
    .populate({
      path: "products.dropdown_data",
      model: "Dropdown",
    })
    .then((data) => {
      console.log(data[0].payment_type.dropdown_data);
      res.render("section2/pendingForm", { data: data[0] });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditPending = (req, res, next) => {};
