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
  console.log("abc");
  const file = req.file;
  csv()
    .fromFile(`public/files/${file.filename}`)
    .then((jsonObj) => {
      // console.log(jsonObj[0]['Date'])
      // const newLead=new Lead({
      //     date:jsonObj.Date,
      // })
      for (let i = 0; i < jsonObj.length; i++) {
        const date = Date.now();
        const source = jsonObj[i]["Source"];
        const cm_firstname = jsonObj[i]["CM First Name"];
        const cm_lastname = jsonObj[i]["CM Last Name"];
        const cm_phone = jsonObj[i]["CM Phone"];
        const agent_name = jsonObj[i]["Agent Name"];
        const language = jsonObj[i]["Language"];
        const disease = jsonObj[i]["Disease"];
        const age = jsonObj[i]["Age"];
        const height = jsonObj[i]["Height"];
        const weight = jsonObj[i]["Weight"];
        const state = jsonObj[i]["State"];
        const city = jsonObj[i]["City/District"];
        const remark = jsonObj[i]["Remark"];
        const comment = jsonObj[i]["Comment"];
        // const newLead=new Lead({
        //     source:{
        //         dropdown_data:'669258512f5aaf7d9cb3cd56',
        //         value:source
        //     },
        //     CM_First_Name:cm_firstname,
        //     CM_Last_Name:cm_lastname,
        //     CM_Phone:cm_phone,
        //     alternate_Number:cm_altername_number,
        //     agent_name:{
        //         dropdown_data:agent_dd_id,
        //         value:agent_name
        //     },
        //     language:{
        //         dropdown_data:language_dd_id,
        //         value:language
        //     },
        //     disease:{
        //         dropdown_data:disease_dd_id,
        //         value:disease
        //     },
        //     age:age,
        //     height:height,
        //     weight:weight,
        //     state:{
        //         dropdown_data:state_dd_id,
        //         value:state
        //     },
        //     city:city,
        //     remark:{
        //         dropdown_data:remark_dd_id,
        //         value:remark
        //     },
        //     comment:comment
        // })
        // let dateObj=new Date(date+"T00:00:00")
        // const formatter = new Intl.DateTimeFormat('en-GB', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric'
        // });

        // const formattedDate = formatter.format(dateObj);
        // console.log(formattedDate);

        console.log(source,cm_phone,agent_name,language,age,height
        );
      }
    });
};
