
const express = require("express")
const router = express.Router()

const {getProducts,createProduct,updateProducts,deleteProducts} = require("../3-controllers/products")

    router.route("/").get(getProducts).post(createProduct).patch(updateProducts).delete(deleteProducts)

    module.exports = router