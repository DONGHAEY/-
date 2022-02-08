const {Wallet} = require("../../models/Wallet")


const New = (id,cb) => {
    const wallet = new Wallet({_id : id})
    wallet.save((err, walletInfo) => {
        if(err) return cb(err, null)
        return cb(false, walletInfo)
    })
}

module.exports = New