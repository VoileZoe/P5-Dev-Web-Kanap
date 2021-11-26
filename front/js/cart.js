const $cartItemContainer = document.getElementById("cart__items");

// retrieve cart in the localStorage
const getCart = () => {
  const cart = localStorage.getItem("cart");

  // return an empty array if the cart doesn't exist
  if (cart === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem("cart"));
};

const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// retrieve product info on server
const retrieveProductInfo = (cartInfo) => {
  // call the API with the id in cart info
  fetch("http://localhost:3000/api/products/" + cartInfo.id)
    // check if response is ok
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

    // create productCard with both server info and cart info
    .then((serverInfo) => {
      createProductCard({ serverInfo: serverInfo, cartInfo: cartInfo });
    })
    .catch((error) => {
      // TODO : traitement en cas d'erreur
      console.log("Oh no", error);
    });
};

// function delete product from cart
const deleteProduct = (e, id, color) => {
  if (confirm("Voulez-vous supprimer cet article ?")) {
    e.target.closest("article").remove();
    removeFromCart(id, color);
  }
};

// function to remove element from cart
const removeFromCart = (id, color) => {
  const cart = getCart();
  const indexToRemove = cart.findIndex(
    (product) => product.id === id && product.color === color
  );
  cart.splice(indexToRemove, 1);
  setCart(cart);
};

// generate all DOM elements
const createProductCard = (product) => {
  console.log(product);

  const productImg = document.createElement("img");
  productImg.setAttribute("src", product.serverInfo.imageUrl);
  productImg.setAttribute("alt", product.serverInfo.altTxt);

  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  divImg.appendChild(productImg);

  const productName = document.createElement("h2");
  productName.innerHTML = product.serverInfo.name;
  const productColor = document.createElement("p");
  productColor.innerHTML = product.cartInfo.color;
  const productPrice = document.createElement("p");
  productPrice.innerHTML =
    product.cartInfo.quantity * product.serverInfo.price + " €";

  const divContentDescription = document.createElement("div");
  divContentDescription.classList.add("cart__item__content__description");
  divContentDescription.appendChild(productName);
  divContentDescription.appendChild(productColor);
  divContentDescription.appendChild(productPrice);

  const productQuantity = document.createElement("p");
  productQuantity.innerHTML = "Qté : ";
  const btnQuantity = document.createElement("input");
  btnQuantity.classList.add("itemQuantity");
  btnQuantity.setAttribute("type", "number");
  btnQuantity.setAttribute("name", "itemQuantity");
  btnQuantity.setAttribute("min", "1");
  btnQuantity.setAttribute("max", "100");
  // créer une function quantity
  btnQuantity.setAttribute("value", product.cartInfo.quantity);

  const productSettingsQuantity = document.createElement("div");
  productSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  productSettingsQuantity.appendChild(productQuantity);
  productSettingsQuantity.appendChild(btnQuantity);

  const btnDeleteText = document.createElement("p");
  btnDeleteText.classList.add("deleteItem");
  btnDeleteText.innerHTML = "supprimer";

  const btnDelete = document.createElement("div");
  btnDelete.classList.add("cart__item__content__settings__delete");
  btnDelete.appendChild(btnDeleteText);
  btnDelete.addEventListener("click", (e) =>
    deleteProduct(e, product.cartInfo.id, product.cartInfo.color)
  );

  const productSettings = document.createElement("div");
  productSettings.classList.add("cart__item__content__settings");
  productSettings.appendChild(productSettingsQuantity);
  productSettings.appendChild(btnDelete);

  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  divContent.appendChild(divContentDescription);
  divContent.appendChild(productSettings);

  const containerCard = document.createElement("article");
  containerCard.classList.add("cart__item");
  btnQuantity.setAttribute("data-id", product.serverInfo._id);
  btnQuantity.setAttribute("data-color", product.cartInfo.color);
  containerCard.appendChild(divImg);
  containerCard.appendChild(divContent);

  $cartItemContainer.appendChild(containerCard);
};

const main = () => {
  // add listeners to buttons delete & order

  // retrieve cart in localStorage
  const productsInCart = getCart();
  for (let cartInfo of productsInCart) {
    retrieveProductInfo(cartInfo);
  }

  // create product card for each product in cart
};

main();
