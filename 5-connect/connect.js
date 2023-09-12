
const mongoose = require("mongoose")

const connectDB = (url) => {
    console.log("Connectted to DB");
    mongoose.connect(url)
}

module.exports = connectDB