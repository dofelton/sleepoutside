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
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// new function to get URL parameters
export function getParams(param) {
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

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);

  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const filePathHeader = "/partials/header.html";
  const filePathFooter = "/partials/footer.html";
  const header = await loadTemplate(filePathHeader);
  const footer = await loadTemplate(filePathFooter);

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
  itemsInCart();
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
