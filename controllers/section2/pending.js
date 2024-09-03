const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");
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
      },
      sale_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca09c6efcae9d04adb360e"),
      },
      agent_name: {
        dropdown_data: data.agent_name.dropdown_data,
        value: data.agent_name.value,
      },
      CM_First_Name: data.CM_First_Name,
      CM_Last_Name: data.CM_Last_Name,
      CM_Phone: data.CM_Phone,
      Alternate_Number: data.alternate_Phone,
      status: {
        dropdown_data: new mongoose.Types.ObjectId("66cd80b921c654779763c616"),
      },
      comment: data.comment,
      shipment_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca0a39efcae9d04adb3612"),
      },
      post_type: {
        dropdown_data: new mongoose.Types.ObjectId("66ca0abfefcae9d04adb3616"),
      },
      City_District: data.city,
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
      },
      products: {
        dropdown_data: new mongoose.Types.ObjectId("66cb7b9c2d2b09775bd57dfc"),
      },
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
      // console.log("data");

      // console.log(data);
      res.render("section2/pendingForm", { data: data[0] });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditPending = (req, res, next) => {
  const payment_type = req.body.payment_type;
  const sale_type = req.body.sale_type;
  const agent_name = req.body.agent_name;
  const CM_First_Name = req.body.CM_First_Name;
  const CM_Last_Name = req.body.CM_Last_Name;
  const CM_Phone = req.body.CM_Phone;
  const Alternate_Number = req.body.Alternate_Number;
  const email = req.body.email;
  const status = req.body.status;
  const comment = req.body.comment;
  const shipment_type = req.body.shipment_type;
  const address = req.body.address;
  const post_type = req.body.post_type;
  const post = req.body.post;
  const subDistrict_Taluka = req.body.subDistrict_Taluka;
  const City_District = req.body.City_District;
  const pincode = req.body.pincode;
  const state = req.body.state;
  const disease = req.body.disease;
  const amount = req.body.amount;
  const products = req.body.products;
  const quantity = req.body.quantity;

  const dataId = req.body.dataId;

  Pending.findById(dataId)
    .then((item) => {
      item.payment_type.value = payment_type;
      item.markModified("payment_type");
      item.sale_type.value = sale_type;
      item.markModified("sale_type");
      item.agent_name.value = agent_name;
      item.markModified("agent_name");
      item.CM_First_Name = CM_First_Name;
      item.markModified("CM_First_Name");
      item.CM_Last_Name = CM_Last_Name;
      item.markModified("CM_Last_Name");
      item.CM_Phone = CM_Phone;
      item.markModified("CM_Phone");
      item.Alternate_Number = Alternate_Number;
      item.markModified("Alternate_Number");
      item.email = email;
      item.markModified("email");
      item.status.value = status;
      item.markModified("status");
      item.comment = comment;
      item.markModified("comment");
      item.shipment_type.value = shipment_type;
      item.markModified("shipment_type");
      item.address = address;
      item.markModified("address");
      item.post_type.value = post_type;
      item.markModified("post_type");
      item.post = post;
      item.markModified("post");
      item.subDistrict_Taluka = subDistrict_Taluka;
      item.markModified("subDistrict_Taluka");
      item.City_District = City_District;
      item.markModified("City_District");
      item.pincode = pincode;
      item.markModified("pincode");
      item.state.value = state;
      item.markModified("state");
      item.disease.value = disease;
      item.markModified("disease");
      item.amount.value = amount;
      item.markModified("amount");
      item.products.value = products;
      item.markModified("products");
      item.quantity = quantity;
      item.markModified("quantity");
      console.log(item);
      return item.save();
    })
    .then((result) => {
      console.log("RESULT:");

      console.log(result);
      console.log("Update successful:");
      res.redirect("/pending");
    })
    .catch((error) => {
      console.error("Error updating document:", error);
      res.status(500).send({ message: "Error updating document", error });
    });
};
