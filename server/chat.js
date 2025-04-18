const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  gradYear: Number,
  email: String,
  courses_taken: Array,
  major: String,
  minor: String,
  academicInterest: String,
  message: String,
  connections: Number,
});

module.exports = mongoose.model("Connection", coffeeSchema);
