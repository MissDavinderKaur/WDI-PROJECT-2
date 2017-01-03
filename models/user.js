const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true},
  email: {type: String, trim: true},
  phone: {type: String },
  tasklist: [{ type: mongoose.Schema.ObjectId, ref: 'Task' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
