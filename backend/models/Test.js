const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Test name is required'],
      trim: true,
      maxlength: [100, 'Test name cannot exceed 100 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class is required'],
    },
    date: {
      type: Date,
      required: [true, 'Test date is required'],
    },
    maxMarks: {
      type: Number,
      required: [true, 'Maximum marks is required'],
      min: [1, 'Maximum marks must be at least 1'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by (teacher) is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying tests by class
testSchema.index({ class: 1, date: -1 });

module.exports = mongoose.model('Test', testSchema);
