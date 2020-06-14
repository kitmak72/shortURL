const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: String,

  registrationDate: {
    type: Date,
    default: Date.now
  },

  google: {
    id: String,
    picture: String
  }
});

userSchema.pre('save', async function (next) {
  if (this.google.id) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
