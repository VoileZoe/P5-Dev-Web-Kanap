const $cartItemContainer = document.getElementById("cart__items");

const $firstNameElement = document.getElementById("firstName");
const $lastNameElement = document.getElementById("lastName");
const $addressElement = document.getElementById("address");
const $cityElement = document.getElementById("city");
const $emailElement = document.getElementById("email");

// compute quantity and price
const computeTotal = (cartInfo, serverInfo) => {
  const elementQuantity = document.getElementById("totalQuantity");
  const elementPrice = document.getElementById("totalPrice");
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let cartProduct of cartInfo) {
    let serverProduct = serverInfo.find((e) => e._id === cartProduct.id);
    totalQuantity += parseInt(cartProduct.quantity);
    totalPrice +=
      parseInt(cartProduct.quantity) * parseInt(serverProduct.price);
  }

  elementQuantity.innerHTML = totalQuantity;
  elementPrice.innerHTML = totalPrice;
};

/**
 * function update the quantity of the product in cart
 * retrieve cart in the localStorage
 * find the product with the given id and color
 * update the quantity of the product
 * set the updated cart in the localStorage
 */
const updateProduct = (e, id, color) => {
  const cart = getCart();
  const indexToUpdate = cart.findIndex(
    (product) => product.id === id && product.color === color
  );
  cart[indexToUpdate].quantity = e.target.value;
  setCart(cart);
  sumQuantity();
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
  productImg.setAttribute("src", product.serverProduct.imageUrl);
  productImg.setAttribute("alt", product.serverProduct.altTxt);

  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  divImg.appendChild(productImg);

  const productName = document.createElement("h2");
  productName.innerHTML = product.serverProduct.name;
  const productColor = document.createElement("p");
  productColor.innerHTML = product.cartProduct.color;
  const productPrice = document.createElement("p");
  productPrice.innerHTML =
    product.cartProduct.quantity * product.serverProduct.price + " €";

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
  btnQuantity.setAttribute("value", product.cartProduct.quantity);
  btnQuantity.addEventListener("change", (e) =>
    updateProduct(e, product.cartProduct.id, product.cartProduct.color)
  );

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
    deleteProduct(e, product.cartProduct.id, product.cartProduct.color)
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
  btnQuantity.setAttribute("data-id", product.serverProduct._id);
  btnQuantity.setAttribute("data-color", product.cartProduct.color);
  containerCard.appendChild(divImg);
  containerCard.appendChild(divContent);

  $cartItemContainer.appendChild(containerCard);
};

/**function to valid the form
 * test the content of inputs with regexp
 * create error message if the test doesn't pass
 * @returns isValid if all tests passed
 */
const validateForm = () => {
  let isValid = true;

  const array = [
    {
      regexp: /^[A-Z][A-zÀ-ú]+$/,
      input: $firstNameElement,
      errorElement: document.getElementById("firstNameErrorMsg"),
      errorMessage:
        "Veuillez remplir le champ Prénom en commençant par une majuscule afin de valider votre commande.",
    },
    {
      regexp: /^[A-Z][A-zÀ-ú]+$/,
      input: $lastNameElement,
      errorElement: document.getElementById("lastNameErrorMsg"),
      errorMessage:
        "Veuillez remplir le champ Nom en commençant par une majuscule afin de valider votre commande.",
    },
    {
      regexp: /^.+$/,
      input: $addressElement,
      errorElement: document.getElementById("addressErrorMsg"),
      errorMessage:
        "Veuillez remplir le champ adresse afin de valider votre commande.",
    },
    {
      regexp: /^[A-Z][A-zÀ-ú]+$/,
      input: $cityElement,
      errorElement: document.getElementById("cityErrorMsg"),
      errorMessage:
        "Veuillez remplir le champ Ville en commençant par une majuscule afin de valider votre commande.",
    },
    {
      regexp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      input: $emailElement,
      errorElement: document.getElementById("emailErrorMsg"),
      errorMessage:
        "Veuillez remplir le champ Email afin de valider votre commande.",
    },
  ];

  for (const testElement of array) {
    if (!testElement.regexp.test(testElement.input.value)) {
      console.log(testElement.input.value + " is invalid");
      isValid = false;
      testElement.errorElement.innerText = testElement.errorMessage;
    } else {
      testElement.errorElement.innerText = "";
    }
  }
  return isValid;
};

// create contact en products object then post it to the API
const order = () => {
  const cart = getCart();

  const contact = {
    firstName: $firstNameElement.value,
    lastName: $lastNameElement.value,
    address: $addressElement.value,
    city: $cityElement.value,
    email: $emailElement.value,
  };
  const products = [];
  for (const product of cart) {
    products.push(product.id);
  }

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact: contact, products: products }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error ", response.statusText);
      }
    })
    .then((response) => console.log(response.orderId));
};

const main = () => {
  // retrieve cart in localStorage
  const cartInfo = getCart();

  // add listeners to order button
  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();
    if (validateForm()) {
      order();
    }
  });

  // retrieve all products on server
  retrieveProductData(
    (id = null),
    // on success, compute total price and quantity and then create product cards
    (onSuccess = (serverInfo) => {
      computeTotal(cartInfo, serverInfo);
      for (const cartProduct of cartInfo) {
        let serverProduct = serverInfo.find((e) => e._id === cartProduct.id);
        createProductCard({
          serverProduct: serverProduct,
          cartProduct: cartProduct,
        });
      }
    }),
    (onError = (response) => console.log(response))
  );
};

main();
