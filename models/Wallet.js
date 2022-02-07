const { compareDocumentPosition } = require("domutils");
const mongoose = require("mongoose")

const walletSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    kmoney : {
        type: Number,
        default: 5000
    },
    investing:{type:Object},
    bill : [{type: mongoose.Schema.Types.ObjectId, ref:'contract'}],
})

walletSchema.methods.buyandsell = function buy(price, contract, cb) {

    const wallet = this
    wallet.kmoney = price
    wallet.bill.push(contract._id)

    let obj = {}
    if(!wallet.investing){
        obj[contract.currencyCode] = {
            currencyCode : contract.currencyCode,
            count : contract.count
        }
        wallet.investing = {...wallet.investing, ...obj}
    } 
    else {
        let arr = Object.keys(wallet.investing)
        console.log(arr)
        if(arr.includes(contract.currencyCode)) {
            obj[contract.currencyCode] = {
                currencyCode : contract.currencyCode,
                count : (contract.type === 'buy' ? contract.count + wallet.investing[contract.currencyCode].count : wallet.investing[contract.currencyCode].count - contract.count)
            }
            wallet.investing = {...wallet.investing, ...obj}
        } else {
            obj[contract.currencyCode] = {
                currencyCode : contract.currencyCode,
                count : contract.count
            }
            wallet.investing = {...wallet.investing, ...obj}
        }
    }
    wallet.save(cb)
};

const Wallet = mongoose.model('wallet', walletSchema)

module.exports = {Wallet}