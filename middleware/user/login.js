"use strict"

const {User} = require("../../models/user")

const login = (id, password, cb) => {
    User.findOne({"id": id}, (err, user) => {
        if (err) return cb(err, false, null)
        else if(!user) {
            return cb(false, false, null)
        }
        user.comparePassword(password, (err1, isMatch)=> {
            if(err1) return cb(err1, false, null)
            else if (!isMatch) return cb(false, false, null)
            user.generateToken((err2, user1) => {
                if(err2) return cb(err2, false, null)
                return cb(false, true, user1)
            })
        })
    })
}

//함수 사용법//
// login(id, password, (err, isMatch, usr) => {
//      if(err) throw err;
//      else if(!isMatch) { 아이디나 비밀번호가 맞지 않을 때 }
//      else { 아이디와 비밀번호가 일치함 }
//})

module.exports = login