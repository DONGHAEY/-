"use strict"

const {User} = require("../../models/user")

const logout = (key, cb) => {
    User.findOneAndUpdate({token:key}, { token:""}, (err1, user)=> {
        if(err1) return cb(err1)
        return cb(false)
    })
}

module.exports = logout