import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// let listCart = getLocalStorage("so-cart");
// recuperar en forma de array
let listCart = [];
if (getLocalStorage("so-cart")) {
  listCart = getLocalStorage("so-cart");
}

function addProductToCart(product) {
  if (listCart.length > 0) {
    const productInCart = listCart.find((p) => p.Id === product.Id);
    if (productInCart) {
      alert("Item already in cart!");

      return;
    }
  }

  listCart.push(product);

  setLocalStorage("so-cart", listCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
