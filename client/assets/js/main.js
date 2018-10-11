var app = new Vue({
  el: '#app',
  data: {

    events: [],

    email: '',
    password: '',

    eventName: '',
    eventLocation: '',
    eventAddress: '',

    searchEventName: '',

    isLogin: false,

    boxMsgSuccessLogin: false,
    boxMsgFailedLogin: false,
    msgSuccessLogin: '',
    msgFailedLogin: ''

  },
  created: function () {
    this.getTtoken()
    this.getAlldataEvent()
  },
  methods: {
    getTtoken: function () {
      let token = localStorage.getItem('token')
      if(token){
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },

    login: function () {

      let data = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'POST',
        url: `http://localhost:3000/users/login`,
        data
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        this.msgSuccessLogin = 'Login Success'
        this.boxMsgSuccessLogin = true
        this.getTtoken()
      }).catch((err) => {
        this.msgFailedLogin  = err.response.data.message
        this.boxMsgFailedLogin = true
      })

    },

    logout: function () {
      localStorage.removeItem('token')
      this.getTtoken()
    },

    getAlldataEvent: function () {
      axios({
        method: 'GET',
        url: `http://localhost:3000/events`,
      })
      .then((response) => {
        this.events = response.data.events
      }).catch((err) => {
        console.log(err.response.data.message)
      })
    },

    createEvent: function () {
      let data = {
        name: this.eventName,
        location: this.eventLocation,
        address: this.eventAddress
      }

      axios({
        method: 'POST',
        url: `http://localhost:3000/events`,
        data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        // console.log(response.data.event)
        this.getAlldataEvent()
      }).catch((err) => {
        console.log(err.response.data.message)
      })
    },

    searchEvent: function () {
      axios({
        method: 'GET',
        url: `http://localhost:3000/events/search/${this.searchEventName}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        this.events = response.data.events
      }).catch((err) => {

        console.log(err.response.data.message)
      })
    },

    home: function () {
      this.getAlldataEvent()
    },

    closeMsgSuccess: function () {
      this.boxMsgSuccessLogin = false
    },

    closeMsgfailed: function () {
      this.boxMsgFailedLogin = false
    }
  },
  computed: {
    // subTotalPrice: function () {
    //   let index = 0

    //   if(this.carts.length >= 1) {
    //     index = this.carts.length - 1
    //     this.totalPrice += Number(this.carts[index][0].price)
    //   } else {
    //     value = 0
    //   }

    //   return this.totalPrice

    // }
  },
  watch: {
    // searchbyname: function (value) {
    //   axios({
    //     method: 'GET',
    //     url: `http://localhost:3000/products/findByName?product=${value}`,
    //   })
    //   .then((response) => {
    //     this.boxProduct = true
    //     this.myMarket = false
    //     this.products = response.data.products
    //   }).catch((err) => {
    //     console.log(err.response)
    //   })
    // }
  }
})
