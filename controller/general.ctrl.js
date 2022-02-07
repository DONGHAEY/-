const express = require('express')
const router = express.Router()

const {login, logout, register} = require("../middleware/user/user")
const {NewWallet} = require("../middleware/wallet/wallet")

router.get("/", (req, res) => {
    res.render("root")
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/register' ,(req, res) => {
    res.render("register")
})

router.get('/logout', (req, res) => {
    const key = req.cookies.auth
    logout(key, (err)=> {
        if(err) throw err
        return res.redirect("/login")
    })
})

router.post('/login', (req, res) => {
    const {id, password} = req.body
    login(id, password, (err, isMatch, user) => {
        if(err) throw err;
        else if(!isMatch) return res.redirect("/login")
        res.cookie("auth", user.token).redirect("/service")
    })
})

router.post('/register', (req, res) => {
    register(req.body, (err, user)=> {
        if(err) throw err
        NewWallet(user._id, (err1, walletInfo) => {
            if(err1) throw err1
            return res.redirect("/login")
        })
    })
})

module.exports = router