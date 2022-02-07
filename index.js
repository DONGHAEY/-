const express = require("express")
const cookieParser = require("cookie-parser")
const mongodb = require("./db/mongodb")
const job = require("./schedule/index")
const port = 80
const {AuthMiddleware} = require("./middleware/middleware")
const {ServiceController, GeneralController} = require("./controller/controller")
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/service', AuthMiddleware, ServiceController)
app.use('/', GeneralController)

const db1 = new mongodb("mongodb+srv://root:me@cluster0.kwfqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", "DB1")
db1.start()

app.listen(port, () => {
    console.log(`server is opened at ${port}`)
})