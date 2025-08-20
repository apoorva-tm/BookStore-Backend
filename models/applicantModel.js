//import mongoose
const mongoose = require("mongoose");

//Create schema and model
const applicantSchema = new mongoose.Schema({
fullName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  }
})
module.exports = mongoose.model("applicants",applicantSchema)