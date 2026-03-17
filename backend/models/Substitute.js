const mongoose = require('mongoose');

const substituteSchema = new mongoose.Schema(
  {
    originalTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Original teacher is required'],
    },
    substituteTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Substitute teacher is required'],
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
    reason: {
      type: String,
      trim: true,
      maxlength: [200, 'Reason cannot exceed 200 characters'],
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin who assigned the substitute
    },
  },
  {
    timestamps: true,
  }
);

// One substitute per class per date
substituteSchema.index({ class: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Substitute', substituteSchema);
