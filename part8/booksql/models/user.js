const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    required: true,
  },
  favouriteGenre: {
    type: String,
    minlength: 3,
    required: true,
  },
});

module.exports = mongoose.model('User', schema);
