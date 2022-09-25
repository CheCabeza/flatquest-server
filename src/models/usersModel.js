const mongoose = require('mongoose');
const md5 = require('md5');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  favorites: Array,
  last_visited: Array,
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return md5(password) === this.password;
};

module.exports = mongoose.model('user', userSchema);
