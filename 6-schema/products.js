
const mongoose = require("mongoose")

const Products = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Must be a name"]
    },
    price:{
        type:Number,
        required:[true, "Must be a price"]
    },
    company:{
        type:String,
        enum: {
            values: ["ikea","marcos","liddy","caressa"],
            message : "{VALUE} is not supported"
        }
    },
    rating:{
        type:Number,
        default : 4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    featured:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        required:[true,"Must be a image"]
    }
})

module.exports = mongoose.model("ProductsModel", Products)