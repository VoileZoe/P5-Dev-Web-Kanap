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

// create the alert element with text and an id
const createAlert = (textAlert, id) => {
  const alert = document.createElement("p");
  alert.setAttribute("id", id);
  alert.innerText = textAlert;
  alert.style.backgroundColor = "#f54242";
  alert.style.width = "fit-content";
  alert.style.borderRadius = "50px";
  alert.style.paddingLeft = "10px";
  alert.style.paddingRight = "10px";

  return alert;
};

// check if color and quantity form is valid
const validateForm = (color, quantity) => {
  let isValid = true;

  // first remove all alerts if exist
  document.getElementById("colorAlert")?.remove();
  document.getElementById("quantityAlert")?.remove();

  // add alert if color is empty
  if (color === "") {
    const itemContentSettingsColor = document.querySelector(
      ".item__content__settings__color"
    );
    const colorAlert = createAlert("Veuillez saisir une couleur", "colorAlert");
    itemContentSettingsColor.appendChild(colorAlert);

    isValid = false;
  }

  // add alert if quantity is invalid
  if (quantity < 1 || quantity > 100) {
    const itemContentSettingsQuantity = document.querySelector(
      ".item__content__settings__quantity"
    );
    const quantityAlert = createAlert(
      "Veuillez saisir un nombre entre 1 et 100",
      "quantityAlert"
    );
    itemContentSettingsQuantity.appendChild(quantityAlert);

    isValid = false;
  }

  return isValid;
};

// Add product to cart
const onAddToCart = (event) => {
  const id = productId;
  const color = productColors.value;
  const quantity = productQuantity.value;

  // check if color and quantity are valid
  if (!validateForm(color, quantity)) {
    return;
  }
  let cart = getCart();
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
  setCart(cart);
  alert("Vos articles ont bien été ajoutés au panier !");
};

/**
 * main function
 * retrieve product data
 * then create card for each product
 */
const main = () => {
  addToCartBtn.addEventListener("click", onAddToCart);

  retrieveProductData(productId, fillProductInfo, null);
};

main();
