import {
  getLocalStorage,
  setLocalStorage,
  itemsInCart,
  loadHeaderFooter,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// loadHeaderFooter();

function renderCartContents() {
  loadHeaderFooter();
  const cartItems = getLocalStorage("so-cart");
  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    var items = document.querySelectorAll(".delete");
    items.forEach((item) => item.addEventListener("click", deleteFromCart));
  } else {
    const htmlItems = `<h3>The cart is Empty</h3>`;
    document.querySelector(".product-list").innerHTML = htmlItems;
  }
  total(cartItems);
  itemsInCart();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
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
      finalPrice += element.FinalPrice;
    });
    displayTotal.innerHTML = `<b>Total</b>: $${finalPrice}`;
    displayTotal.style.display = "block";
  } else {
    displayTotal.style.display = "none";
  }
}

function deleteFromCart(item) {
  var inCart = getLocalStorage("so-cart");
  var index = 0;
  for (const element in inCart) {
    if (inCart[element].Id == item.target.id) {
      index = element;
      break;
    }
  }
  inCart.splice(index, 1);
  setLocalStorage("so-cart", inCart);
  location.reload();
}

renderCartContents();
