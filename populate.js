
const Products = require("./6-schema/products")
const connectDB = require("./5-connect/connect")
const products = require("./products.json")
    require("dotenv").config()

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(products)
        process.exit(0) 
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()