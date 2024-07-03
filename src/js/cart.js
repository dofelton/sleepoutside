import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  itemsInCart,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// loadHeaderFooter();

function renderCartContents() {
  loadHeaderFooter();
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    var items = document.querySelectorAll(".delete");
    items.forEach((item) => item.addEventListener("click", deleteFromCart));
    var decrease = document.querySelectorAll(".minus");
    decrease.forEach((item) => item.addEventListener("click", minus));
    var increase = document.querySelectorAll(".plus");
    increase.forEach((item) => item.addEventListener("click", plus));
  } else {
    const htmlItems = `<h3>The cart is Empty</h3>`;
    document.querySelector(".product-list").innerHTML = htmlItems;
  }
  total(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="change-number">
  <p>Qty:</p>
  <span class="minus" data-id=${item.Id}>-</span>
  <input class="cart-card__quantity" value=${item.Qty}>
  <span class="plus" data-id=${item.Id}>+</span>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="delete" id=${item.Id}>&#10005;</span>
</li>`;

  return newItem;
}

function total(cartItems) {
  var displayTotal = document.querySelector(".cart-total");
  if (cartItems.length > 0) {
    var finalPrice = 0;
    cartItems.forEach((element) => {
      finalPrice += element.FinalPrice * element.Qty;
    });
    displayTotal.innerHTML = `<b>Total</b>: $${finalPrice.toFixed(2)}`;
    displayTotal.style.display = "block";
  } else {
    displayTotal.style.display = "none";
  }
}

function deleteFromCart(item) {
  var inCart = getLocalStorage("so-cart");
  var index = 0;
  for (const element in inCart) {
    if (item.target && inCart[element].Id == item.target.id) {
      index = element;
      break;
    } else if (inCart[element].Id == item.id) {
      index = element;
      break;
    }
  }
  inCart.splice(index, 1);
  setLocalStorage("so-cart", inCart);
  location.reload();
}

function minus(id) {
  var nextSibling = parseInt(id.target.nextElementSibling.value) - 1;
  const item = id.target.parentElement.nextElementSibling.nextElementSibling;
  if (nextSibling <= 0) {
    deleteFromCart(item);
  } else {
    id.target.nextElementSibling.value = nextSibling.toString();
    var data = getLocalStorage("so-cart");
    data.forEach((element) => {
      if (element.Id == id.target.dataset.id) {
        element.Qty = String(parseInt(element.Qty) - 1);
        // itemsInCart(data);
        setLocalStorage("so-cart", data);
        itemsInCart(data);
        total(data);
        return;
      }
    });
  }
}

function plus(id) {
  var nextSibling = parseInt(id.target.previousElementSibling.value) + 1;
  id.target.previousElementSibling.value = nextSibling.toString();
  var data = getLocalStorage("so-cart");
  data.forEach((element) => {
    if (element.Id == id.target.dataset.id) {
      element.Qty = String(parseInt(element.Qty) + 1);
      setLocalStorage("so-cart", data);
      itemsInCart(data);
      total(data);
      return;
    }
  });
}

renderCartContents();
