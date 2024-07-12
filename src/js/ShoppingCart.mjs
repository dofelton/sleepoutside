import {
  getLocalStorage,
  setLocalStorage,
  itemsInCart,
} from "./utils.mjs";

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

export default class ShoppingCart {
  constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
      this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice * item.Qty);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      var items = document.querySelectorAll(".delete");
      items.forEach((item) => item.addEventListener("click", this.deleteFromCart));
      var decrease = document.querySelectorAll(".minus");
      decrease.forEach((item) => item.addEventListener("click", this.minus));
      var increase = document.querySelectorAll(".plus");
      increase.forEach((item) => item.addEventListener("click", this.plus));
      this.totalInCart(this.total);
    } else {
      const htmlItems = `<h3>The cart is Empty</h3>`;
      document.querySelector(".product-list").innerHTML = htmlItems;
    }
  }

  totalInCart(total) {
    var totalPrice = document.querySelector(".cart-total");
    var totalElement = document.querySelector(".total");
  
    if (total > 0) {
      const temp = String(total);
      totalElement.innerText = `${temp}`;
      totalPrice.style.display = "block";
    } else {
      totalPrice.style.display = "none";
    }
  }
  deleteFromCart(item) {
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
  
  minus(id) {
    const total = document.querySelector(".total").innerHTML;
    var nextSibling = parseInt(id.target.nextElementSibling.value) - 1;
    const item = id.target.parentElement.nextElementSibling.nextElementSibling;
    if (nextSibling <= 0) {
      this.deleteFromCart(item);
    } else {
      id.target.nextElementSibling.value = nextSibling.toString();
      var data = getLocalStorage("so-cart");
      data.forEach((element) => {
        if (element.Id == id.target.dataset.id) {
          element.Qty = String(parseInt(element.Qty) - 1);
          // itemsInCart(data);
          this.calculateListTotal(element);
          setLocalStorage("so-cart", data);
          this.totalInCart(total);
          itemsInCart(data);
          return;
        }
      });
    }
  }
  
   plus(id) {
    const total = document.querySelector(".total").innerHTML;
    var nextSibling = parseInt(id.target.previousElementSibling.value) + 1;
    id.target.previousElementSibling.value = nextSibling.toString();
    var data = getLocalStorage("so-cart");
    data.forEach((element) => {
      if (element.Id == id.target.dataset.id) {
        element.Qty = String(parseInt(element.Qty) + 1);
        setLocalStorage("so-cart", data);
        this.totalInCart(total);
        itemsInCart(data);
        return;
      }
    });
  }    
};