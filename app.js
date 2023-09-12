
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const ip = "127.0.0.1"
    require("dotenv").config()
const port = process.env.PORT || 5500
    require("express-async-errors")


    app.use(express.json())
    app.use(express.static("./"))



const router = require("./2-router/products")
    app.use("/api/v1/products",router)



const notFound = require("./4-middlewares/notFound")
const asyncErrorHandler = require("./4-middlewares/asyncErrorHandler")
    app.use(notFound)
    app.use(asyncErrorHandler)



const connectDB = require("./5-connect/connect")
const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(port,ip,()=>{
        console.log(`Server is running on ${ip}:${port}`);
    })
    } catch (error) {
        console.log(error);
    }
}
startServer()