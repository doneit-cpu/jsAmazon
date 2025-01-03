import {cart,removeFromCart, updatedeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'  
import { deliveryOptions} from '../data/deliveryOptions.js'

// hell0();
const today=dayjs();
const deliveryDate =today.add(0,'days');
const dateString = deliveryDate.format('dddd, MMMM D');
let cartSummaryHTML = '';
// console.log(cart)
cart.forEach((cartItem) =>{
      const productId=cartItem.productId;

      let matchingProduct;

      products.forEach((product)=>{
        if (product.id === productId){
          matchingProduct = product;
        } 
      });
 //esm version ,ecmascript is also name for jabascript

   
      const deliveryOptionId = cartItem.deliveryOptionsId;
      // console.log(deliveryOptionId)

      let deliveryOption ;

      deliveryOptions.forEach((option)=>{
        if (option.id===deliveryOptionId){
          deliveryOption=option;
        }
      });
      // console.log(deliveryOption)
      const today=dayjs();
      const deliveryDate=today.add(
        deliveryOption.deliveryDays,
        'days'
      );
  
      const dateString = deliveryDate.format('dddd, MMMM D')
      


  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
<div class="delivery-date ">
  Delivery date: ${dateString}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingProduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-price">
      $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${cartItem.
          quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary
      js-delete-link" data-product-id="${matchingProduct.id}"> 
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${deliveryOptionsHTML(matchingProduct,cartItem)}
    
  </div>
</div>
</div>`; 

})

function deliveryOptionsHTML(matchingProduct,cartItem){

  let html='';

  deliveryOptions.forEach((deliveryOption)=>{  // this give us three type of shipping the option
    const today=dayjs();
    const deliveryDate=today.add(
      deliveryOption.deliveryDays,
      'days'

    );

    const dateString = deliveryDate.format('dddd, MMMM D')
    ;
    const priceString = deliveryOption.priceCents 
    === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
    // console.log(deliveryOption.id);
    // console.log(cartItem);
    // console.log(matchingProduct.id,'id')
    const isChecked = deliveryOption.id ===
    cartItem.deliveryOptionsId; // 
    html +=
    `<div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-deliveryoptions-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked ? 'checked' : ''} 
        
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
         ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>`
  });

  return html;
  
}

// 13:48
document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
// console.log(cartSummaryHTML);

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId =link.dataset.productId;
    removeFromCart(productId);

    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    console.log(container);
      container.remove();  // this will remoeve whole html from (dom), shoert cut for remove item from webpage // like an dyanmic remove the item from display 
  });
});

//14:31

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    
    element.addEventListener('click',()=>{
      const {productId,deliveryoptionsId}=element.dataset;
      // console.log(productId,deliveryoptionsId)
      updatedeliveryOption(productId,deliveryoptionsId);
      
    })
  })


// function dilverydatechange(){

//   document.querySelectorAll('.js-deliverdate-change').forEach((element)=>{  //it give all the things from html which evre has class name  
//     const  deliverydateId=element.dataset.deliverydateId;  // this gives indiviual id for delivrydate div , like for shock and baksetball diff 
   
        
//     });

// }
// 14.52