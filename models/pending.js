const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pendingSchema = new Schema({
  ref: {
    type: string,
    required: true,
    unique: true,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  },
  time: {
    type: Date,
    required: true,
    default: new Date().toLocaleTimeString("en-US", { hour12: false }),
  },
  payment_type: {
    type: Object,
    dropdown_data: {
      type: Schema.Types.ObjectId,
      ref: "Dropdown",
    },
    value: {
      type: String,
    },
  },
});

pendingSchema.pre("save", async function (next) {
  if (!this.ref) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    const lastDocument = await this.constructor.findOne(
      { ref: new RegExp(`^${year}${month}`) },
      { ref: 1 },
      { sort: { ref: -1 } }
    );

    let newId = "001";
    if (lastDocument) {
      const lastId = parseInt(lastDocument.ref.slice(-3));
      newId = (lastId + 1).toString().padStart(3, "0");
    }

    this.ref = `${year}${month}${newId}`;
  }
  next();
});

module.exports = mongoose.model("Pending", pendingSchema);
