// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// new function to get URL parameters
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function itemsInCart() {
  const inCart = getLocalStorage("so-cart");
  const circle = document.querySelector(".circle");
  try {
    if (inCart.length > 0 && inCart.length < 10) {
      circle.style.display = "block";
      var number = document.querySelector(".one-number");
      number.style.display = "block";
      number.innerHTML = inCart.length;
    } else if (inCart.length >= 10) {
      circle.style.display = "block";
      var display = document.querySelector(".two-numbers");
      display.style.display = "block";
      display.innerHTML = inCart.length;
    } else {
      circle.style.display = "none";
      document.querySelector(".one-number").style.display = "none";
      document.querySelector(".two-numbers").style.display = " none";
    }
  } catch {
    new Error("Error reading cookies");
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  var data =  getLocalStorage("so-cart");

  renderWithTemplate(headerTemplate, headerElement,data, itemsInCart);
  renderWithTemplate(footerTemplate, footerElement);
  itemsInCart();
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
      // mycheckout.checkout();
    callback();
  });
  qs(selector).addEventListener("click", callback)
  
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}