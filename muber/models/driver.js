const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverShema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  }
});

const Driver = mongoose.model('driver', DriverShema);

module.exports = Driver;
