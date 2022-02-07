const mongoose = require("mongoose")

const contractSchema = new mongoose.Schema({
    currencyCode : {
        type:String,
    },
    basePrice : {
        type : Number,
    },
    count : {
        type: Number,
    },
    type : {
        type:String,
    },
    time : {
        type:Date,
        default:Date.now,
    },
    wallet : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'wallet',
    }
})

const Contract = mongoose.model('contract', contractSchema)

module.exports = {Contract}