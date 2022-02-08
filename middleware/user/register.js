"use strict"

const {User} = require("../../models/user")

const register = (data, cb) => {
    const user = new User(data)
    user.wallet = user._id
    user.save((err1, userInfo) => {
        if(err1) return cb(err1, null)
        return cb(false, userInfo)
    })
}

//함수 사용법//
// register(req.body, (err, userInfo) => {
//      if(err) throw err;
//      else { 원하는 로직 }
//})

module.exports = register