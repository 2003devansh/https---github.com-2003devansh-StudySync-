const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  syllabus: {
    type: String,
    required: [true, 'Syllabus is required'],
  },
  examDate: {
    type: Date,
    required: [true, 'Exam date is required'],
  },
  goals: {
    type: [String], 
    default: [],
  },
  studyPlan: {
    type: Array, 
    required: true,
  },
  completedTasks: {
    type: [String], 
    default: [],
  },
  reminders: {
    type: [String], 
    default: [],
  },
  aiGenerated: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
