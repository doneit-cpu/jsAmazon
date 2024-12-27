import {cart , addtocart } from '../data/cart.js';
import { products } from '../data/products.js';   // module always has to top of the file , and opening file or render(html on chrome or load) we need to opne with live server , bcs module work with live server only 

let productHTML = '';
// main idea od js , save data , then genrate html , make interactive
products.forEach((product) => {
  productHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}   
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;


});

//Module means varible which is inside the file , will be inside the file  so , so naming conflict where we same name vaaible(in both file ) , and don't work

/*here we had done this done products.js file which is just we had done export type thing  , so we had done thsi , and after this we run amazon.js which take product info from this  product.js , and amzon .js file run this and it's make dynamic htm , also we done in first product.js file first and after amazon bcs we info product*/
document.querySelector('.js-products-grid').innerHTML = productHTML;
// console.log(cart);

function updatecartquantity(){

   
  let cartQuantity=0;

  cart.forEach((item)=>{
    cartQuantity +=item.quantity;
  });

  console.log(cartQuantity)
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

  console.log(cart);

}


// when u get this product-id  ,it's called kabab case when we - , so when u change it's name ,it's has written like this productId
document.querySelectorAll('.js-add-to-cart').forEach(
  (button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; // give id  

      addtocart(productId);   // add the productid into the id 

      updatecartquantity(); // update the quantity of product whic u have order 

    })

  // 12:28
  });