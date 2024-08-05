const mongoose = require('mongoose');

const Dropdown = require('../../models/dropdowns')
const Workbook=require('../../models/workbook')
const Incoming=require('../../models/incoming')

exports.getAddIncomingData=(req, res,next)=>{
    Dropdown.find()
    .then((data) => {
        // console.log(data)
        data.map(item => ({
            name: item.name,
            values: item.values
        }));
        return data
    })
    .then((data) => {
        // console.log(data)
        res.render('workbook/addIncomingData',{dropdowns: data})

    })
    .catch((err) => {
        console.log(err)
    })
}

exports.postAddIncomingData=(req, res, next)=>{
    const data_dd_id=new mongoose.Types.ObjectId(req.body.data_dd_id)
    const source=req.body.Source
    const source_dd_id=new mongoose.Types.ObjectId(req.body.source_dd_id)
    const cm_firstname=req.body.cmFirstName
    const cm_lastname=req.body.cmLastName
    const cm_phone=req.body.cmphone
    const cm_altername_number=req.body.cmPhoneAlternateNumber
    const agent_name=req.body['Agent Name']
    const agent_dd_id=new mongoose.Types.ObjectId(req.body.agent_dd_id)
    const language=req.body.Language
    const language_dd_id=new mongoose.Types.ObjectId(req.body.language_dd_id)
    const disease=req.body.Disease
    const disease_dd_id=new mongoose.Types.ObjectId(req.body.disease_dd_id)
    const age=req.body.age
    const height=req.body.height
    const weight=req.body.weight
    const state=req.body.State
    const state_dd_id=new mongoose.Types.ObjectId(req.body.state_dd_id)
    const city=req.body.city
    const remark = req.body.Remark
    const remark_dd_id=new mongoose.Types.ObjectId(req.body.remark_dd_id)
    const comment=req.body.comment

    const incomingData=new Incoming({
        source:{
            dropdown_data:source_dd_id,
            value:source
        },
        date:Date.now(),
        CM_First_Name:cm_firstname,
        CM_Last_Name:cm_lastname,
        CM_Phone:cm_phone,
        alternate_Number:cm_altername_number,
        agent_name:{
            dropdown_data:agent_dd_id,
            value:agent_name
        },
        language:{
            dropdown_data:language_dd_id,
            value:language
        },
        disease:{
            dropdown_data:disease_dd_id,
            value:disease
        },
        age:age,
        height:height,
        weight:weight,
        state:{
            dropdown_data:state_dd_id,
            value:state
        },
        city:city,
        remark:{
            dropdown_data:remark_dd_id,
            value:remark
        },
        comment:comment
    })

    incomingData.save()
    .then((result)=>{
        console.log("Saved in incoming")
    })
    .catch((error)=>{
        console.log(error)
    })

    const workbookData=new Workbook({
        data:{
            dropdown_data:data_dd_id,
            value:"Incoming"
        },
        date:Date.now(),
        source:{
            dropdown_data:source_dd_id,
            value:source
        },
        CM_First_Name:cm_firstname,
        CM_Last_Name:cm_lastname,
        CM_Phone:cm_phone,
        alternate_Number:cm_altername_number,
        agent_name:{
            dropdown_data:agent_dd_id,
            value:agent_name
        },
        language:{
            dropdown_data:language_dd_id,
            value:language
        },
        disease:{
            dropdown_data:disease_dd_id,
            value:disease
        },
        age:age,
        height:height,
        weight:weight,
        state:{
            dropdown_data:state_dd_id,
            value:state
        },
        city:city,
        remark:{
            dropdown_data:remark_dd_id,
            value:remark
        },
        comment:comment
    })
    workbookData.save()
    .then((result)=>{
        res.redirect('/workbook')
    })
    .catch((error)=>{
        console.log(error)
    })
}


exports.getIncomingData=(req,res,next)=>{
    Incoming.find()
    .then((data)=>{
        // console.log(data)
    res.render('workbook/incoming',{data:data})

    })
    .catch((error)=>{
        console.log(error)
    })
}