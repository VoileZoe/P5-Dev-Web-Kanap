const retrieveProductsData = async () =>
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .catch(err => console.log("Oh no", err))

const createProductCardImg = (url, alt) => {
    const $productImg = document.createElement('img')
    $productImg.setAttribute('src', url)
    $productImg.setAttribute('alt', alt)
    
    return $productImg
}

const createProductCardH3 = (name) => {
    const $productH3 = document.createElement('h3')
    $productH3.classList.add('productName')
    $productH3.innerHTML = name
    
    return $productH3
}

const createProductCardP = (description) => {
    const $productP = document.createElement('p')
    $productP.classList.add('productDescription')
    $productP.innerHTML = description
    
    return $productP
}

const createProductCardArticle = product => {
    const $productCardArticle = document.createElement('article')

    const $productImg = createProductCardImg(product.imageUrl, product.altTxt)
    const $productH3 = createProductCardH3(product.name)
    const $productP = createProductCardP(product.description)

    $productCardArticle.appendChild($productImg)
    $productCardArticle.appendChild($productH3)
    $productCardArticle.appendChild($productP)

    return $productCardArticle
}

const createProductCard = product => {
    const $productCard = document.createElement('a')
    $productCard.setAttribute("href", "./product.html?id=" + product._id)
    const $productArticle = createProductCardArticle(product)
    $productCard.appendChild($productArticle)

    return $productCard
}

const main = async () => {
    const productsData = await retrieveProductsData()
    console.log(productsData);

    const $items = document.getElementsByClassName('items')
    for (let product of productsData) {
        items.appendChild(createProductCard(product))
    }
}

main()

