const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true, min: 1 },
  hasAC: { type: Boolean, required: true },
  hasAttachedWashroom: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);