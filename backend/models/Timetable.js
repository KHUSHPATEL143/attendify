const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema(
  {
    periodNumber: {
      type: Number,
      required: [true, 'Period number is required'],
      min: 1,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    startTime: {
      type: String, // HH:mm format
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String, // HH:mm format
      required: [true, 'End time is required'],
    },
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class is required'],
    },
    day: {
      type: String,
      enum: {
        values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        message: '{VALUE} is not a valid day',
      },
      required: [true, 'Day is required'],
    },
    periods: {
      type: [periodSchema],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one period is required',
      },
    },
  },
  {
    timestamps: true,
  }
);

// One timetable entry per class per day
timetableSchema.index({ class: 1, day: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);
