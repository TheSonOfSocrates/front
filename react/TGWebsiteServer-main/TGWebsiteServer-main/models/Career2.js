const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Career2Schema = new Schema(
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
    selfie: {
      type: String,
      required: true
    },
    video: {
      type: String,
      required: true
    },
    portfolioLink: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

module.exports = Career2 = mongoose.model('career2', Career2Schema);