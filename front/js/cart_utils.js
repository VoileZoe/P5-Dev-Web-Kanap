// retrieve cart in the localStorage
const getCart = () => {
  const cart = localStorage.getItem("cart");
  // return an empty array if the cart doesn't exist
  if (cart === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem("cart"));
};

// push cart object in the localStorage
const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
