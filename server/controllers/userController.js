const User = require('../models/user')
const jwt = require('jsonwebtoken')
const checkPassword = require('../helpers/checkPassword')

module.exports = {

  register: function (req,res) {

    let dataUser = new User({
      name : req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    dataUser.save()
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Account helo registered"
        })
      })
      .catch((err) => {
        res.status(500).json({
          message : 'registered failed'
        })
      });
  },

  login: function (req,res) {

    let user = null
    
    User.findOne({'email':req.body.email })
    .then(function(dataUser){
        if(dataUser) {
          user = dataUser
          return checkPassword(user.password, req.body.password, req.body.email)
        }else {
          res.status(404).json({
            message : `Email and password didn't match`
          })
        }
    })
    .then(function(){
      jwt.sign({
        userId : user._id,
      }, process.env.DATA_ACCESS, function(err,token){
        if(!err){
            res.status(200).json({
                token : token
            })
        } else {
            res.status(500).json({
                message : `Token not valid`
            })
        }
      })
    })
    .catch(function(){
        res.status(500).json({
            message : `Email and password didn't match`
        })
    })

  }

}