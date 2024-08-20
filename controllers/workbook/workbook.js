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

// exports.postAddWorkbookData = (req, res, next) => {
//   const data = req.body.Data;
//   const commonFields = {
//     source: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.source_dd_id),
//       value: req.body.Source,
//     },
//     date: Date.now(),
//     CM_First_Name: req.body.cmFirstName,
//     CM_Last_Name: req.body.cmLastName,
//     CM_Phone: req.body.cmphone,
//     alternate_Phone: req.body.cmPhoneAlternateNumber,
//     agent_name: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.agent_dd_id),
//       value: req.body["Agent Name"],
//     },
//     language: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.language_dd_id),
//       value: req.body.Language,
//     },
//     disease: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.disease_dd_id),
//       value: req.body.Disease,
//     },
//     age: req.body.age,
//     height: req.body.height,
//     weight: req.body.weight,
//     state: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.state_dd_id),
//       value: req.body.State,
//     },
//     city: req.body.city,
//     remark: {
//       dropdown_data: new mongoose.Types.ObjectId(req.body.remark_dd_id),
//       value: req.body.Remark,
//     },
//     comment: req.body.comment,
//   };

//   const saveWorkbookData = (Data_ID) => {
//     const workbookData = new Workbook({
//       data: {
//         dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id),
//         value: data,
//       },
//       date: Date.now(),
//       source: commonFields.source,
//       dataId: Data_ID,
//       CM_First_Name: commonFields.CM_First_Name,
//       CM_Last_Name: commonFields.CM_Last_Name,
//       CM_Phone: commonFields.CM_Phone,
//       alternate_Phone: commonFields.alternate_Number,
//       agent_name: commonFields.agent_name,
//       language: commonFields.language,
//       disease: commonFields.disease,
//       age: commonFields.age,
//       height: commonFields.height,
//       weight: commonFields.weight,
//       state: commonFields.state,
//       city: commonFields.city,
//       remark: commonFields.remark,
//       comment: commonFields.comment,
//     });

//     workbookData
//       .save()
//       .then(() => {
//         res.redirect("/workbook");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const saveData = (Model) => {
//     const dataInstance = new Model(commonFields);
//     dataInstance
//       .save()
//       .then((result) => {
//         const Data_ID = result._id;
//         saveWorkbookData(Data_ID);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   if (data === "Incoming") {
//     saveData(Incoming);
//   } else {
//     saveData(Lead);
//   }
// };

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
