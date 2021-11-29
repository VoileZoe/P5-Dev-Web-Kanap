const main = () => {
  const orderId = localStorage.getItem("orderId");
  localStorage.removeItem("orderId");
  if (orderId === null) {
    location.replace(
      "http://127.0.0.1:5500/P5-Dev-Web-Kanap/front/html/index.html"
    );
  } else {
    document.getElementById("orderId").innerText = orderId;
    setCart([]);
  }
};

main();
