import { cart ,updatedeliveryOption} from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption  } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'

export function renderpaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  let numofItem=0;
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    productPriceCents+=product.priceCents * cartItem.quantity
    
    const deliveryOption= getDeliveryOption(cartItem.deliveryOptionsId)
    shippingPriceCents += deliveryOption.priceCents;
    console.log(deliveryOption.priceCents)
    numofItem += cartItem.quantity;
  });

  const totolBeforeTaxCents=shippingPriceCents;
  const TaxCents = shippingPriceCents*(0.1);
  const totalCents =TaxCents+totolBeforeTaxCents+productPriceCents;
  // console.log(shippingPriceCents);
  // console.log(productPriceCents,'not');
  const paymentSummaryhtml
  =` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${numofItem}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$ ${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totolBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
           `

          document.querySelector('.payment-summary').innerHTML=paymentSummaryhtml;


          // document.querySelectorAll('.js-delivery-option')
          // .forEach((element)=>{
            
          //   element.addEventListener('click',()=>{
          //     const {productId,deliveryoptionsId}=element.dataset;
          //     // this shortcut for taling data atributes , like data-(name)=${your,id} , it's uniqe name ot the of element in 
          //     updatedeliveryOption(productId,deliveryoptionsId);
          //     renderpaymentSummary();
          //   })
          // })

}



// console.trace();