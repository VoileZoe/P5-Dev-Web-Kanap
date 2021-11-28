// create img element for the DOM
const createProductCardImg = (url, alt) => {
  const $productImg = document.createElement("img");
  $productImg.setAttribute("src", url);
  $productImg.setAttribute("alt", alt);

  return $productImg;
};

// create product name element for the DOM
const createProductCardH3 = (name) => {
  const $productH3 = document.createElement("h3");
  $productH3.classList.add("productName");
  $productH3.innerHTML = name;

  return $productH3;
};

// create product description element for the DOM
const createProductCardP = (description) => {
  const $productP = document.createElement("p");
  $productP.classList.add("productDescription");
  $productP.innerHTML = description;

  return $productP;
};

// create card article element for the DOM
const createProductCardArticle = (product) => {
  const $productCardArticle = document.createElement("article");

  // call function to create inner elements
  const $productImg = createProductCardImg(product.imageUrl, product.altTxt);
  const $productH3 = createProductCardH3(product.name);
  const $productP = createProductCardP(product.description);

  // integrate element in article
  $productCardArticle.appendChild($productImg);
  $productCardArticle.appendChild($productH3);
  $productCardArticle.appendChild($productP);

  return $productCardArticle;
};

// create the card element for the DOM
const createProductCard = (product) => {
  const $productCard = document.createElement("a");
  $productCard.setAttribute("href", "./product.html?id=" + product._id);
  const $productArticle = createProductCardArticle(product);
  $productCard.appendChild($productArticle);

  return $productCard;
};

/**
 * main function
 * retrieve product data
 * then create card for each product
 */
const main = () => {
  retrieveProductData(
    (id = null),
    (onSuccess = (response) => {
      const $items = document.getElementsByClassName("items");
      for (let product of response) {
        items.appendChild(createProductCard(product));
      }
    }),
    (onError = (response) => {
      document
        .getElementById("items")
        .appendChild(
          createAlert(
            "Une erreur s'est produite : Impossible de récupérer les produits, le serveur est inaccessible"
          )
        );
    })
  );
};

main();
