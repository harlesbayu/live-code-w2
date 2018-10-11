const Event = require('../models/event')

module.exports = {

  findAll: function(req,res) {

    Event.find()
      .then(events => {
        res.status(200).json({
          events
        })
      })
      .catch(err => {
        res.status(200).json({
          err
        })
      })

  },

  create: function(req,res) {

    let dataEvent = new Event({
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
      user: req.userId
    })

    dataEvent.save()
      .then((event) => {
        res.status(200).json({
          event
        })
      })
      .catch((err) => {
        res.status(500).json({
          err,
          meesage: 'create event failed'
        })
      })

  },

  searchByName: function(req,res) {

    Event.find(
      {name: new RegExp(req.params.keyword, "i")}
      )
      .then((events) => {
        res.status(200).json({
          events
        })
      })
      .catch((err) => {
        res.status(200).json({
          err
        })
      })

  }

}