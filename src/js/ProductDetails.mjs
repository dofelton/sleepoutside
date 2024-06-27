import { setLocalStorage, getLocalStorage, itemsInCart } from "./utils.mjs";

// to recuperate the arrays of products in the cart from local storage
let listCart = [];
if (getLocalStorage("so-cart")) {
  listCart = getLocalStorage("so-cart");
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    itemsInCart();
  }
  
addToCart() {
    if (this.product) {
      try {
        listCart.push(this.product);
        setLocalStorage("so-cart", listCart);
        location.reload();
      } catch {
        new Error("Could not add item");
      }
    }
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin",productDetailsTemplateConstruct(this.product));
      // element.innerHTML = productDetailsTemplateConstruct(this.product);
  }
}

function productDetailsTemplateConstruct(product) {
  let discountPercentage = 0;
  let classDiscount = "discount-none";
  let finalSalePrice = "$" + product.FinalPrice;

  if (product.FinalPrice > 300) {
    classDiscount = "discount-high";
    discountPercentage = 30;
    finalSalePrice = `($<s>${product.FinalPrice}</s>) <b>$${(product.FinalPrice * 0.7).toFixed(2)}</b>`;
  } else if (product.FinalPrice > 150) {
    discountPercentage = 20;
    classDiscount = "discount-medium";
    finalSalePrice = `($<s>${product.FinalPrice}</s>) <b>$${(product.FinalPrice * 0.8).toFixed(2)}</b>`;
  } else if (product.FinalPrice > 100) {
    discountPercentage = 10;
    classDiscount = "discount-low";
    finalSalePrice = `($<s>${product.FinalPrice}</s>) <b>$${(product.FinalPrice * 0.9).toFixed(2)}</b>`;
  }

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="${classDiscount}">${discountPercentage} %</p>
    <p class="product-card__price">${finalSalePrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}
