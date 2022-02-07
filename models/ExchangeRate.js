const mongoose = require("mongoose")


const rateSchema = new mongoose.Schema({
    value : {
        type:Object,
    },
    time : {
        type:Date,
        default:Date.now,
    }
})

const ExchangeRate = mongoose.model('ExchangeRate', rateSchema)

module.exports = {ExchangeRate}