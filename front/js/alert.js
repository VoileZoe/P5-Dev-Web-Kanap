// create the alert element with text and an id
const createAlert = (textAlert, id) => {
  const alert = document.createElement("p");
  alert.setAttribute("id", id);
  alert.innerText = textAlert;
  alert.style.backgroundColor = "#f54242";
  alert.style.width = "fit-content";
  alert.style.borderRadius = "50px";
  alert.style.padding = "5px 15px 5px 15px";
  alert.style.margin = "auto";
  alert.style.marginTop = "10px";
  alert.style.marginBottom = "10px";

  return alert;
};
