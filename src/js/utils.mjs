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

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);

  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  var data =  getLocalStorage("so-cart");

  renderWithTemplate(headerTemplate, headerElement,data, itemsInCart);
  renderWithTemplate(footerTemplate, footerElement);
  itemsInCart();
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback)
  
}

// export function itemsInCart(data) {
//   var totalItems = 0;
//   const one = document.querySelector(".one-number");
//   const two = document.querySelector(".two-numbers");
//   const circle = document.querySelector(".circle");
//     try {
//       for (let item of data) {
//         totalItems += parseInt(item.Qty)
//       }
//       if (data && data.length > 0 && data.length < 10) {
//         circle.style.display = "block";
//         one.style.display = "block";
//         // two.style.display = "none";
//         one.innerHTML = totalItems;
//       } else if (data && data.length >= 10) {
//         circle.style.display = "block";
//         // one.style.display = "none";
//         two.style.display = "block";
//         two.innerHTML = totalItems;
//       } else {
//         circle.style.display = "none";
//         one.style.display = "none";
//         two.style.display = " none";
//       }
//     } catch {
//       document.querySelector(".cicle").style.display = "none";
//       document.querySelector(".one-number").style.display = "none";
//       document.querySelector(".two-numbers").style.display = " none";
//       new Error("Error reading cookies");
//     }
//   }