const mongoose = require('mongoose');

const Dropdown = require('../models/dropdowns')

exports.getAddDropdown = (req, res, next) => {
    res.render('admin/addDropdown', {
        pageTitle: 'Add Dropdown',
    });
};

exports.postAddDropdown = (req, res, next) => {
    const dropdownName=req.body.dropdownName
    const dropdownValues=req.body.dropdownValues
    const array_values=dropdownValues.split(',')
    const dropdown=new Dropdown({
        name: dropdownName,
        values: array_values
    })
    dropdown.save()
    .then(result=>{
        res.redirect('/admin/addDropdown')
    })
    .catch(err=>{
        console.log(err)
    })
}
