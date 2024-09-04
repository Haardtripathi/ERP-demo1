const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leadSchema = new Schema(
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
      //,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
      immutable: true, // This will prevent the date from being modified
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
      type: Number,
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
      },
      //,
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
      //,
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
      //,
    },
    age: {
      type: Number,
      // required: true,
    },
    height: {
      type: Number,
      // required: true,
    },
    weight: {
      type: Number,
      // required: true,
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
      //,
    },
    city: {
      type: String,
      // required: true,
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
      //,
    },
    comment: {
      type: String,
      // required: true,
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

module.exports = mongoose.model("Lead", leadSchema);
