// products data info
const productContainerImg = document.querySelector(".item__img");
const productName = document.getElementById("title");
const productDescription = document.getElementById("description");
const productColors = document.getElementById("colors");
const productPrice = document.getElementById("price");
const productQuantity = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCart");

// retrieve id in URL param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

// retrieve all products from API
const retrieveProductData = (id) =>
  fetch("http://localhost:3000/api/products/" + id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(
          `une erreur s'est produite : ${response.status} - ${response.statusText}`
        );
        console.log(response);
      }
    })
    .then(fillProductInfo)
    .catch((error) => {
      //traitement en cas d'erreur
      console.log("Oh no", error);
    });

// fill infos for the DOM
const fillProductInfo = (productData) => {
  productContainerImg.appendChild(
    createProductImg(productData.imageUrl, productData.altTxt)
  );
  productName.textContent = productData.name;
  productDescription.textContent = productData.description;
  productPrice.textContent = productData.price;

  createColorOptions(productData.colors);
};

// create img element for the DOM
const createProductImg = (url, alt) => {
  const productImg = document.createElement("img");
  productImg.setAttribute("src", url);
  productImg.setAttribute("alt", alt);

  return productImg;
};

// create color selector element for the DOM
const createColorOptions = (colors) => {
  // for each color, create DOM option element and append to DOM productColors
  for (let color of colors) {
    const option = document.createElement("option");
    option.innerHTML = color;
    option.setAttribute("value", color);
    productColors.appendChild(option);
  }
};

// Add product to cart
const onAddToCart = (event) => {
  const id = productId;
  const color = productColors.value;
  const quantity = productQuantity.value;

  // check in the localStorage if cart exists

  let cart = JSON.parse(localStorage.getItem("cart"));
  // if cart doesn't exist creat a new one and push informations
  if (cart === null) {
    cart = [];
    cart.push({ id: id, color: color, quantity: quantity });
    // else the cart exists, so we look for the product
  } else {
    const productIndex = cart.findIndex(
      (product) => product.id === id && product.color === color
    );
    // if product doesn't exist, add it
    if (productIndex === -1) {
      cart.push({ id: id, color: color, quantity: quantity });
      // else the product exist, sum the current quantity to it
    } else {
      cart[productIndex].quantity =
        parseInt(cart[productIndex].quantity) + parseInt(quantity);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);
};

/**
 * main function
 * retrieve product data
 * then create card for each product
 */
const main = () => {
  addToCartBtn.addEventListener("click", onAddToCart);

  retrieveProductData(productId);
};

main();
