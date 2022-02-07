const axios = require("axios")
const schedule = require("node-schedule")
const {ExchangeRate} = require("../models/ExchangeRate")

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };


var job = schedule.scheduleJob('0 0/5 * * * *', async () => {
    const country = ['FRX.KRWUSD', 'FRX.KRWCNY', 'FRX.KRWJPY', 'FRX.KRWEUR', 'FRX.KRWHKD', 'FRX.KRWTHB', 'FRX.KRWTWD', 'FRX.KRWPHP', 'FRX.KRWSGD', 'FRX.KRWAUD', 'FRX.KRWVND', 'FRX.KRWGBP', 'FRX.KRWCAD', 'FRX.KRWMYR', 'FRX.KRWRUB', 'FRX.KRWZAR', 'FRX.KRWNOK', 'FRX.KRWNZD', 'FRX.KRWDKK', 'FRX.KRWMXN', 'FRX.KRWMNT', 'FRX.KRWBHD', 'FRX.KRWBDT', 'FRX.KRWBRL', 'FRX.KRWBND', 'FRX.KRWSAR', 'FRX.KRWLKR', 'FRX.KRWSEK', 'FRX.KRWCHF', 'FRX.KRWAED', 'FRX.KRWDZD', 'FRX.KRWOMR', 'FRX.KRWJOD', 'FRX.KRWILS', 'FRX.KRWEGP', 'FRX.KRWINR', 'FRX.KRWIDR', 'FRX.KRWCZK', 'FRX.KRWCLP', 'FRX.KRWKZT', 'FRX.KRWQAR', 'FRX.KRWKES', 'FRX.KRWCOP', ' FRX.KRWKWD', 'FRX.KRWTZS', 'FRX.KRWTRY', 'FRX.KRWPKR', 'FRX.KRWPLN', 'FRX.KRWHUF']
    let value = []
    for (let i=0; i<country.length; i++) {
        const p = await axios.get("https://quotation-api-cdn.dunamu.com/v1/forex/recent", {
            params: {codes: country[i]}
        })
        if(p.data[0].name != null) {
            value.push(p.data[0])
        }
    }
    // console.log(value)
    // console.log(convertArrayToObject(value, 'currencyCode'))
    const Rate = new ExchangeRate({
        value : convertArrayToObject(value, 'currencyCode')
    })
    Rate.save((err, Info) => {
        if(err) throw err
    })
})

module.exports = job