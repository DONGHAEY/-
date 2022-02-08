const {Wallet} = require("../../models/Wallet")

const write = require("../contract/write")


const sell = async (who, what, how, cb) => {

    const mywallet = await Wallet.findOne({_id : who})
    
    if(!mywallet.investing || !mywallet.investing[what.currencyCode] || mywallet.investing[what.currencyCode].count < how) {
        //매도 불가 상황
        const err = new Error('당신은 이 화폐가 없습니다');
        return cb(err, {contract : null, wallet: mywallet})
    }
    const total = mywallet.kmoney+(what.basePrice * how)
    write(mywallet, what, how, "sell", (err, contract) => {
        if(err) return cb(err, {contract : null, wallet: walletInfo})
        mywallet.buyandsell(total, contract, (err, walletInfo) => {
            if(err) return cb(err, {contract : null, wallet: walletInfo})
            return cb(false, {contract : contract, wallet: walletInfo})
        })
    })
}

module.exports = sell