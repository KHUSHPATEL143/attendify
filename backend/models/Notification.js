const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    type: {
      type: String,
      enum: {
        values: ['absence', 'late', 'result', 'general'],
        message: '{VALUE} is not a valid notification type',
      },
      required: [true, 'Notification type is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    recipientPhone: {
      type: String,
      trim: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['sms', 'whatsapp', 'email'],
      default: 'sms',
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    sentAt: {
      type: Date,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for querying notifications
notificationSchema.index({ student: 1, createdAt: -1 });
notificationSchema.index({ deliveryStatus: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
