
const Products = require("../6-schema/products")

const getProducts = async(req,res) => {

    const{name,company,featured,numericFilters,sort,fields} = req.query

    let obj = {}

        if(name) {
            obj.name = {$regex:name,$options:"i"}
        }
        if(company) {
            obj.company = company
        }
        if(featured) {
            obj.featured = featured === "true" ? true : false
        }
        if(numericFilters) {

            const operationMap = {
                ">" : "$gt",
                ">=" : "$gte",
                "=" : "$eq",
                "<" : "$lt",
                "<=" : "$lte"
            }

            const regEx =  /\b(<|>|>=|=|<|<=)\b/g;

            let filters = numericFilters.replace(regEx,
                (match)=>`-${operationMap[match]}-`)

            const options = ["price","rating"]

                filters = filters.split(",").forEach(item => {
                    const [field, operator, value] = item.split("-")
                    if(options.includes(field)) {
                        obj[field] = {[operator] : Number(value)}
                    }
                });
                console.log(obj);

            // console.log(filters);
        }

    let result = Products.find(obj)

        if(sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }else {
            result = result.sort("createdAt")
        }

        if(fields) {
            const fieldList = fields.split(",").join(" ");
            result = result.select(fieldList)
            console.log(fieldList);
        }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)

    const products = await result
    console.log(products.length);


    res.status(200).json({nmHits:products.length,products})
}

const createProduct = async(req,res) => {
    try {
        const product = await Products.create(req.body)
        res.status(200).json({product})
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateProducts = async(req,res) => {
    res.status(200).send("Update Products")
}

const deleteProducts = async(req,res) => {
    try {
        const products = await Products.deleteMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {getProducts,createProduct,updateProducts,deleteProducts}