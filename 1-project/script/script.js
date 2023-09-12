
let productsArr = []
const url = "/api/v1/products/"
let query = ""

    window.addEventListener("DOMContentLoaded",()=> {
        getProducts(query)    
    })

const searchInp = document.querySelector("#searchInp")

    searchInp.addEventListener("input",()=> {
        const value = searchInp.value
            query = `?name=${value}`
            getProducts(query)
    })

const companySelect = document.querySelector("#companySelect")

    companySelect.addEventListener("input",()=>{

            query = `?company=${value}&`

            if(value === "all") query = ""

            getProducts(query)
    })

const featuredCheckbox = document.querySelector("#featuredCheckbox")

    featuredCheckbox.addEventListener("input",()=>{
        let value = featuredCheckbox.checked ? true : false
            query = `?featured=${value}`
            getProducts(query)
    })

const minPriceRange = document.querySelector("#minPriceRange")

    minPriceRange.addEventListener("input",(e)=>{
        const value = minPriceRange.value * 4
        query = `?numericFilters=price>=${value}`
            getProducts(query)

        const priceBox = document.querySelectorAll(".priceBox")[0]
            priceBox.classList.add("visible")
            priceBox.innerText = `$${value}`

        const width = priceBox.getBoundingClientRect().width
        const height = priceBox.getBoundingClientRect().height
            console.log({width,height});

        minPriceRange.addEventListener("mousemove",(e)=>{
            const x = e.offsetX
            const y = e.offsetY
                // console.log({x,y});
            priceBox.style.top = `${y - height}px`
            priceBox.style.left = `${x + (width / 2)}px`
        })

        minPriceRange.addEventListener("mouseleave",()=>{
            priceBox.classList.remove("visible")
        })
    })

const maxPriceRange = document.querySelector("#maxPriceRange")

    maxPriceRange.addEventListener("input",()=>{
        const value = maxPriceRange.value * 4
            query = `?numericFilters=price<=${value}`
            getProducts(query)
                console.log(query);

        const priceBox = document.querySelectorAll(".priceBox")[1]
            priceBox.classList.add("visible")
            priceBox.innerText = `$${value}`
    
        const width = priceBox.getBoundingClientRect().width
        const height = priceBox.getBoundingClientRect().height
    
           maxPriceRange.addEventListener("mousemove",(e)=>{
                const x = e.offsetX
                const y = e.offsetY

                priceBox.style.top = `${y - height}px`
                priceBox.style.left = `${x + (width / 2)}px`
            })
    
           maxPriceRange.addEventListener("mouseleave",()=>{
                priceBox.classList.remove("visible")
            })
    })

const sortSelect = document.querySelector("#sortSelect")

    sortSelect.addEventListener("input",()=>{
        const value = sortSelect.value 
            query = `?sort=${value}`
            getProducts(query)
            console.log(query);
    })



function getProducts(query) {
    if(!query) query = ""

    axios.get(`${url}${query}`)
    .then(res=> {
        productsArr = res.data.products
    })
    .then(()=>{
        displayProducts()
    })
}

function displayProducts() {
    let result = ""
            productsArr.map(product=>{
                result += `
                    <div class="product">
                        <picture>
                            <figure>
                                <img src=${product.img} alt="">
                            </figure>
                            <figcaption>
                                <p class="name">${product.name} ( ${product.company} )</p>
                                <p class="price">$${product.price} ( ${product.rating}* )</p>
                            </figcaption>
                        </picture>
                    </div>
                `
            })
        const section = document.querySelector("main section")
        section.innerHTML = result
}