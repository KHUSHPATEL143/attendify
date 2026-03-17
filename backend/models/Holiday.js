const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Holiday title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Holiday date is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    type: {
      type: String,
      enum: ['national', 'regional', 'school', 'exam', 'other'],
      default: 'school',
    },
  },
  {
    timestamps: true,
  }
);

// Index for date-based queries
holidaySchema.index({ date: 1 });

module.exports = mongoose.model('Holiday', holidaySchema);
