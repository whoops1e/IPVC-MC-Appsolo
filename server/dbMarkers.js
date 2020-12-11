const mongoose = require('mongoose');

const markersSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    location: { type: Object, required: true },
    photo: String,
    description: String { type: String, required: true }
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model('markers', markersSchema);
