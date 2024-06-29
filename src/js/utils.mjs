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
  const product = urlParams.get(param)
  return product;
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false) {
    const htmlStrings = list.map(templateFn);

    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback) {
      parentElement.insertAdjacentHTML("afterbegin", template);
      if(callback) {
        callback(data);
      }
    }

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const footerElement = document.querySelector("#footer");

  var data =  getLocalStorage("so-so-cart");
  if (data) {
    renderWithTemplate(headerTemplate, headerElement,data, itemsInCart);
  } else {
    renderWithTemplate(headerTemplate, headerElement);
  }
  renderWithTemplate(footerTemplate, footerElement);

}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback)
  
}

export function itemsInCart(data) {
    // const inCart = getLocalStorage("so-cart");
    const circle = document.querySelector(".circle");
    try {
      if (data.length > 0 && data.length < 10) {
        circle.style.display = "block";
        var number = document.querySelector(".one-number");
        number.style.display = "block";
        number.innerHTML = data.length;
      } else if (data.length >= 10) {
        circle.style.display = "block";
        var display = document.querySelector(".two-numbers");
        display.style.display = "block";
        display.innerHTML = data.length;
      } else {
        circle.style.display = "none";
        document.querySelector(".one-number").style.display = "none";
        document.querySelector(".two-numbers").style.display = " none";
      }
    } catch {
      new Error("Error reading cookies");
    }
  }
