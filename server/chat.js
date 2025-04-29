const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  gradYear: Number,
  email: String,
  linkedIn: String,
  coursesTaken: Array,
  major: String,
  minor: String,
  academicInterest: String,
  message: String,
});

module.exports = mongoose.model("Connection", coffeeSchema);
