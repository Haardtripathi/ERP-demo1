const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workbookSchema = new Schema(
  {
    data: {
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
    dataId: {
      type: Schema.Types.ObjectId,
    },
    date: {
      type: Schema.Types.Date,
      default: Date.now(),
    },

    source: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        type: String,
      },
      //required:true,
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
      },
      //required:true,
    },
    language: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        default: "-",
        type: String,
      },
      //required:true,
    },
    disease: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: "Dropdown",
      },
      value: {
        default: "-",
        type: String,
      },
      //required:true,
    },
    age: {
      default: "-",
      type: String,
      required: true,
    },
    height: {
      default: "-",
      type: String,
      required: true,
    },
    weight: {
      default: "-",
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
        default: "-",
        type: String,
      },
      //required:true,
    },
    city: {
      default: "-",
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
        default: "-",
        type: String,
      },
      //required:true,
    },
    comment: {
      default: "-",
      type: String,
      required: true,
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

module.exports = mongoose.model("Workbook", workbookSchema);
