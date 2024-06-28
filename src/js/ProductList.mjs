import { renderListWithTemplate } from "./utils.mjs";

function createProductListItem(product) {
  return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$ ${product.FinalPrice}</p></a
            >
          </li>`;
}

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p></a></li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        console.log(`init data: ${this.category}`)
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;

    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    refineList(listNeded, data) {
        var refineList =  [];
        data.forEach(element => {
            if (listNeded.includes(element.Id))
                refineList.push(element)  
        });
        return refineList;

    }
}
