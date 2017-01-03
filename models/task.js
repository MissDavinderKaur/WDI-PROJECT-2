const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  startDate: {type: Date},
  category: {type: String},
  description: {type: String},
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.ObjectId, ref: 'User' },
  endDate: {type: Date},
  updates: [ {
    date: {type: Date},
    note: {type: String}
  }],
  deleted: {type: Boolean, default: false}
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
