const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CareerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    linkedinProfile: {
      type: String,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    passport: {
      type: String,
      required: true
    },
    portfolioLink: {
      type: String
    },
    ssn: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = Career = mongoose.model('career', CareerSchema);