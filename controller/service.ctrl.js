const express = require("express")
const router = express.Router();

const {ExchangeRate} = require("../models/ExchangeRate")

const Exchange = require("./SubController/Exchange.ctrl");
const ExchangeMiddleware = require("../middleware/Exchange.middleware");

router.get("/", async (req, res) => {
    const memory = await ExchangeRate.findOne().sort({ time: -1 })
    const user = await req.user.populate('wallet')
    const list = Object.values(memory.value)
    let have
    if(!user.wallet.investing) {
        have = {
            not : {
                count : 0,
            }
        }
    } else {
        have = user.wallet.investing
    }

    return res.render("test", {
        user : user,
        have : Object.entries(have),
        data : list,
        time : memory.time,
    })
})

router.get("/list", async (req, res) => {
    // res.cookie("redirURL", "/list")
    const user = await req.user.populate('wallet')
    const bill = await user.wallet.populate('bill')
    return res.render("list", {
        user : user,
        data : bill,
    })
})

router.use("/:d", ExchangeMiddleware, Exchange)

// router.get("/:d", async (req, res) => {
//     let list = []
//     const memory = await ExchangeRate.find({}).sort({time:-1}).limit(32)
//     const user = req.user

//     const {wallet} = await req.user.populate('wallet')

//     memory.forEach(element => {
//         list.push(element.value[req.params.d])
//     })

//     let tempObj = {}

//     if(!wallet.investing || !wallet.investing[req.params.d]) {
//         tempObj.count = 0
//     } else {
//         tempObj = wallet.investing[req.params.d]
//     }

//     let {bill} = await wallet.populate('bill')
//     let bil = []
//     for(let i=0; i<bill.length; i++) {
//         if(bill[i].currencyCode === req.params.d) {
//             bil.push(bill[i])
//         }
//     }
//     list = list.reverse()
//     res.render("stat", {
//         user : user,
//         investing : tempObj,
//         list : list,
//         myexchangebill : bil
//     })
// })


// router.get("/:d/buy", async (req, res) => {
//     const wallet = req.user.wallet
//     const { value } = await ExchangeRate.findOne().sort({time:-1})
//     let su
//     var redirURL = req.cookies.redirURL;
//     console.log(req.query.p)
//     if(!req.query.p) {
//         su = 1
//     } else if (req.query.p < 0)  {
//         su = 0
//     }
//     else    {
//         su = req.query.p
//     }
//     buy(wallet, value[req.params.d], su, (err, data) => {
//         if(err || data == null) {
//             return res.render("complete", {
//                 what : value[req.params.d],
//                 wallet : data.wallet,
//                 message:"매수를 완료하지 못했습니다",
//                 submessage : "잔액을 확인하시거나 문의하시기 바랍니다",
//                 url : redirURL,
//                 count : su,
//                 image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63LmCYn8TGtk3eAqGOn6abzeGGHkY25IjF8vGNsWKsEPPeiPd6QNez2CiKBgFDsKjoQI&usqp=CAU"
//             })
//         }
//         return res.render("complete", {
//             what : data.contract,
//             wallet : data.wallet,
//             message:"매수에 성공하였습니다",
//             submessage : "",
//             url : redirURL,
//             count : su,
//             image : "https://cdn-icons-png.flaticon.com/512/1541/1541495.png"
//         })
//     })
// })

// router.get("/:d/sell", async (req, res) => {
//     let su
//     const who = req.user.wallet
//     var redirURL = req.cookies.redirURL;
//     const what = await ExchangeRate.findOne().sort({time:-1})
//     if(!req.query.p) {
//         su = 1
//     } else if (req.query.p < 0)  {
//         su = 0
//     }
//     else    {
//         su = req.query.p
//     }
//     sell(who, what.value[req.params.d], su, (err, data) => {
//         if(err || data == null) {
//             return res.render("complete", {
//                 what : what.value[req.params.d],
//                 wallet : data.wallet,
//                 message:"매도를 완료하지 못했습니다",
//                 submessage : "보유 화폐를 확인하시거나 문의하시기 바랍니다",
//                 url : redirURL,
//                 count : su,
//                 image : "https://us.123rf.com/450wm/marincas_andrei/marincas_andrei1110/marincas_andrei111000198/10740437-%EB%AC%BC%EC%9D%8C%ED%91%9C-%EC%95%84%EC%9D%B4%EC%BD%98.jpg?ver=6"
//             })
//         }
//         return res.render("complete", {
//             what : data.contract,
//             wallet : data.wallet,
//             message:"매도에 성공하였습니다",
//             submessage : "",
//             url : redirURL,
//             count : su,
//             image : "https://cdn-icons-png.flaticon.com/512/1541/1541495.png"
//         })
//     })
// })

// router.get("/:d/list", async (req, res) => {
//     const {wallet} = await req.user.populate('wallet')

//     let tempObj = {}
//     if(!wallet.investing || !wallet.investing[req.params.d]) {
//         tempObj.count = 0
//     } else {
//         tempObj = wallet.investing[req.params.d]
//     }

//     let {bill} = await wallet.populate('bill')
//     let bil = []
//     for(let i=0; i<bill.length; i++) {
//         if(bill[i].currencyCode === req.params.d) {
//             bil.push(bill[i])
//         }
//     }
//     res.render("statList", {
//         user : req.user,
//         wallet : wallet,
//         bilnm : req.params.d,
//         list : bil
//     })
// })

// router.get("/:d/myincome", async(req, res) => {
//     let list = []
//     const memory = await ExchangeRate.find({}).sort({time:-1}).limit(32)
//     const user = req.user
//     // such as  /list API
//     const {wallet} = await req.user.populate('wallet')

//     memory.forEach(element => {
//         list.push(element.value[req.params.d])
//     })

//     let tempObj = {}

//     if(!wallet.investing || !wallet.investing[req.params.d]) {
//         tempObj.count = 0
//     } else {
//         tempObj = wallet.investing[req.params.d]
//     }

//     let {bill} = await wallet.populate('bill')
//     let bil = []
//     for(let i=0; i<bill.length; i++) {
//         if(bill[i].currencyCode === req.params.d) {
//             bil.push(bill[i])
//         }
//     }

//     list = list.reverse()
//     res.render("myincome", {
//         user : user,
//         wallet : tempObj,
//         list : list,
//         have : bil
//     })
// })

module.exports = router