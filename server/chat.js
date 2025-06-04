import mongoose from 'mongoose';

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

const Connection = mongoose.model("Connection", coffeeSchema);

export default Connection;  