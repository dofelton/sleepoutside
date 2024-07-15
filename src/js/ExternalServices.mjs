// const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
function convertToJson(res) {
  let response = res.json();
  if (res.ok) {
    return response;
  } else {
    throw { name: "servicesError", message: response };
  }
}

export default class ExternalServices {
  constructor() {
    
  }
  
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const response = await convertToJson(products);
    return response.Result;
  }


  async Checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      bodyParser: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}