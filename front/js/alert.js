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
