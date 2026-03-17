const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['present', 'absent', 'late'],
        message: '{VALUE} is not a valid attendance status',
      },
      required: [true, 'Status is required'],
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Marked by (teacher) is required'],
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [200, 'Remarks cannot exceed 200 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index: one attendance record per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

// Index for querying attendance by class and date range
attendanceSchema.index({ class: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
