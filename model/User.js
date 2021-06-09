const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    number: { type: Number, required: true },
  },
  { collection: "users" }
);

module.exports = model("User", schema);
