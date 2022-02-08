const {Contract} = require("../../models/contract")

const write = (wallet, what, how, type, cb) => {
    const {basePrice, currencyCode} = what
    const newContract = new Contract({
        basePrice : basePrice,
        count : how,
        currencyCode : currencyCode,
        type : type,
        wallet : wallet._id,
    })
    newContract.save((err, contractInfo) => {
        if (err) return cb(err, null)
        return cb(false, contractInfo)
    })
}

module.exports = write