const mongoose = require("mongoose");

const Schema = mongoose.Schema;

<<<<<<< HEAD
const incomingSchema = new Schema(
  {
    source: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      required: true,
=======

const incomingSchema = new Schema({
    source:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    date:{
        type: Schema.Types.Date,
        default:Date.now(),
    },
    CM_First_Name:{
        type: String,
        
>>>>>>> 83f68cf8538f055cf98ff4efb86cdea671502947
    },
    date: {
      type: Schema.Types.Date,
      default: Date.now(),
    },
    CM_First_Name: {
      type: String,
      required: true,
    },
    CM_Last_Name: {
      type: String,
      required: true,
    },
    CM_Phone: {
      type: String,
      required: true,
    },
    alternate_Phone: {
      type: Number,
    },
    agent_name: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
<<<<<<< HEAD
      },
      required: true,
    },
    language: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      required: true,
    },
    disease: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    state: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    remark: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      required: true,
    },
    comment: {
      type: String,
      required: true,
=======
        
    },
    CM_Phone:{
        type: Number,
        
    },
    alternative_Number:{
        type: Number
    },
    agent_name:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    language:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    disease:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    age:{
        type: Number,
        
    },
    height:{
        type: Number,
        
    },
    weight:{
        type: Number,
        
    },
    state:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    city:{
        type: String,
        
    },
    remark:{
        type: Object,
        dropdown_data:{
            type:Schema.Types.ObjectId,
            ref:'Dropdown',
        },
        value:{
            type: String,
        },
        
    },
    comment:{
        type: String,
        
>>>>>>> 83f68cf8538f055cf98ff4efb86cdea671502947
    },
    isDeleted: {
      type: Boolean,
      default: 0, // Set default to 0 (closed)
    },
    status: {
      type: String,
      default: 1, // Set default to 1 (active)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incoming", incomingSchema);
