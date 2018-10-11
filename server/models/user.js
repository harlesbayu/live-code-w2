const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generatePassword = require('../helpers/generatePassword')

var userSchema = new Schema({
  name : {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  timestamps : true
});

userSchema.post('save', function(user) {

  generatePassword(this.email, this.password)
  .then(function(newPassword){
      User.update(
          { _id : user._id},
          { password : newPassword}
      )
      .then(function(){})
      .catch(function(){})
  })

})

const User = mongoose.model('User', userSchema)

module.exports = User