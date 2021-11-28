// retrieve id in URL param
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

const main = () => {
  document.getElementById("orderId").innerText = orderId;
};

main();
