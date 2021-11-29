// retrieve id in URL param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

// fill infos for the DOM
const fillProductInfo = (productData) => {
  const productContainerImg = document.querySelector(".item__img");
  const productName = document.getElementById("title");
  const productDescription = document.getElementById("description");
  const productPrice = document.getElementById("price");
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
  const productColors = document.getElementById("colors");

  // for each color, create DOM option element and append to DOM productColors
  for (let color of colors) {
    const option = document.createElement("option");
    option.innerHTML = color;
    option.setAttribute("value", color);
    productColors.appendChild(option);
  }
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
      "Veuillez saisir une quantité entre 1 et 100",
      "quantityAlert"
    );
    itemContentSettingsQuantity.appendChild(quantityAlert);

    isValid = false;
  }

  return isValid;
};

// function to redirect to the home page after adding product to cart
const redirectToHomePage = (quantity) => {
  const confirmString =
    parseInt(quantity) > 1
      ? "Vos articles ont bien été ajoutés au panier"
      : "Votre article a bien été ajouté au panier";
  if (
    confirm(`${confirmString}\nVoulez-vous retourner sur la page d'accueil ?`)
  ) {
    location.replace(
      "http://127.0.0.1:5500/P5-Dev-Web-Kanap/front/html/index.html"
    );
  }
};

// Add product to cart
const onAddToCart = (event) => {
  const id = productId;
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;

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
  redirectToHomePage(quantity);
};

/**
 * main function
 * retrieve product data
 * then create card for each product
 */
const main = () => {
  document.getElementById("addToCart").addEventListener("click", onAddToCart);

  fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 404) {
        //le produit n'existe pas
        throw new Error(response.statusText);
      }

      throw new Error("error message");
    })
    .then(fillProductInfo)
    .catch((response) => {
      document
        .querySelector(".item__content__settings")
        .appendChild(
          createAlert(
            "Une erreur s'est produite : Impossible de récupérer le produit.\n" +
              response
          )
        );
    });
};

main();
