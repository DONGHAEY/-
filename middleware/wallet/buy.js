const {Wallet} = require("../../models/Wallet")

const write = require("../contract/write")


const buy = async (who, what, how, cb) => {

    const mywallet = await Wallet.findOne({_id : who})

    if(mywallet.kmoney < what.basePrice * how) {
        //매수 불가 상황
        const err = new Error('잔액이 부족합니다');
        return cb(err, {contract : null, wallet: mywallet})
    }
    const price = mywallet.kmoney-(what.basePrice * how)
    write(mywallet, what, how, "buy", (err, contract) => {
        if(err) return cb(err, {contract : null, wallet: walletInfo})
        mywallet.buyandsell(price, contract, (err, walletInfo) => {
            if(err) return cb(err, {contract : null, wallet: walletInfo})
            return cb(false, {contract : contract, wallet: walletInfo})
        })
    })
}

module.exports = buy