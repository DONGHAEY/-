"use strict"

const {auth} = require("./user/user")

const AuthMiddleware = (req, res ,next) => {
    const key = req.cookies.auth
    auth(key , async (err, user) => {
        if (err) throw err
        else if (!user) {
            return res.redirect("/login")
        }
        req.user = user
        return next()
    })
}

module.exports = AuthMiddleware