const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
