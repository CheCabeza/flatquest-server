const mongoose = require('mongoose');

const flatSchema = mongoose.Schema({
  address: String,
  m2: Number,
  pros: Array,
  cons: Array,
  neighborhood: String,
  rooms: Number,
  toilet: Number,
  photos: Array,
  price: Number,
  reviews: Array,
  face: Array,
});

module.exports = mongoose.model('flat', flatSchema);
