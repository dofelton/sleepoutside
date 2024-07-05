import { loadHeaderFooter } from "../js/utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.querySelector("#zip")
document.addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout();
});

