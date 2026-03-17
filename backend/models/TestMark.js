const mongoose = require('mongoose');

const testMarkSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: [true, 'Test is required'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    marks: {
      type: Number,
      required: [true, 'Marks are required'],
      min: [0, 'Marks cannot be negative'],
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'F'],
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

// One mark entry per student per test
testMarkSchema.index({ test: 1, student: 1 }, { unique: true });

/**
 * Calculate percentage and grade before saving.
 * Grade System:
 *   A+ ≥ 90%
 *   A  ≥ 75%
 *   B  ≥ 60%
 *   C  ≥ 50%
 *   D  ≥ 35%
 *   F  < 35%
 */
testMarkSchema.pre('save', async function (next) {
  if (this.isModified('marks')) {
    // Need to get the test to know maxMarks
    const Test = mongoose.model('Test');
    const test = await Test.findById(this.test);
    if (test) {
      this.percentage = parseFloat(((this.marks / test.maxMarks) * 100).toFixed(2));

      if (this.percentage >= 90) this.grade = 'A+';
      else if (this.percentage >= 75) this.grade = 'A';
      else if (this.percentage >= 60) this.grade = 'B';
      else if (this.percentage >= 50) this.grade = 'C';
      else if (this.percentage >= 35) this.grade = 'D';
      else this.grade = 'F';
    }
  }
  next();
});

module.exports = mongoose.model('TestMark', testMarkSchema);
