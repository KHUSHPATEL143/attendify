const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    grNumber: {
      type: String,
      required: [true, 'GR Number is required'],
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class is required'],
    },
    rollNumber: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, 'Address cannot exceed 500 characters'],
    },
    parentName: {
      type: String,
      trim: true,
    },
    parentMobile: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    photo: {
      type: String, // File path or URL
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
studentSchema.index({ class: 1, isActive: 1 });
studentSchema.index({ name: 'text', grNumber: 'text' }); // Text search

module.exports = mongoose.model('Student', studentSchema);
