const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
  name : {
    type: String
  },
  location: {
    type: String
  },
  address: {
    type: String
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps : true
});

const Event = mongoose.model('Event', eventSchema)

module.exports = Event