import {cart,removeFromCart, updatedeliveryOption} from '../../data/cart.js';
import { products , getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'  
import { deliveryOptions ,getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderpaymentSummary } from '../checkout/paymentSummary.js'

// hell0();
const today=dayjs();
const deliveryDate =today.add(0,'days');
const dateString = deliveryDate.format('dddd, MMMM D');

// console.log(cart)

export function renderOrdersummany(){
let cartSummaryHTML = '';  ///

cart.forEach((cartItem) =>{

  const productId=cartItem.productId;

  const matchingProduct=getProduct(productId);
  // console.log(matchingProduct);

 
 //esm version ,ecmascript is also name for jabascript
 
      const deliveryOptionId = cartItem.deliveryOptionsId;
      // console.log(deliveryOptionId)
      
      const deliveryOption=getDeliveryOption(deliveryOptionId)
     
      // console.log(deliveryOption)
      const today=dayjs();
      const deliveryDate=today.add(
        deliveryOption.deliveryDays,
        'days'
      );
  
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      // i++;

  cartSummaryHTML += 
  `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
// 
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

  return html;  // in this html we are giving the deliveryoptioin is connected , with each the radio button and also has product id , so we can get diff each type , don't be 
  console.log(html);
}

// 13:48
// Clear old cart items and then add the updated ones


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId =link.dataset.productId; // give us the new product of the perticular id 
    removeFromCart(productId);
    renderpaymentSummary();
    const container=document.querySelector(`.js-cart-item-container-${productId}`);// give access to whole item cart class
    // console.log(container);
      container.remove();  // this will remoeve whole html from (dom), shoert cut for remove item from webpage // like an dyanmic remove the item from display 
  });
});

//14:31


document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
       // this so imp thing , which take your id and the and then make intercative , here we used the productid for product  and the deliveryOption which give us the id for that pertuclar id
    element.addEventListener('click',()=>{
      const {productId,deliveryoptionsId}=element.dataset;
      // this shortcut for taling data atributes , like data-(name)=${your,id} , it's uniqe name ot the of element in 
      updatedeliveryOption(productId,deliveryoptionsId);
      renderpaymentSummary();
      renderOrdersummany();  // this make new html , when we had updated the storage by above the thing , this update the storage then it take thing then html ,
    })
  })
 
}


