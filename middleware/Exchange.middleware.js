"use strict"

const ExchangeMiddleware = (req, res, next)=> {
    req.what = req.params.d
    next()
}

module.exports = ExchangeMiddleware