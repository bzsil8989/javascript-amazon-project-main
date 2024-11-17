import {cart } from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from '../utils/money.js';


export function renderPaymentSummary()
{ 
let productPriceCents=0;
let shippingPriceCents=0;
cart.forEach((cartitem)=>
{
    const product=getProduct(cartitem.productId);
    productPriceCents+=product.priceCents*cartitem.quantity;
    const deliveryOption=getDeliveryOption(cartitem.deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents;
     
    
})
const totalBeforePriceCents=shippingPriceCents+productPriceCents;
const taxCents=totalBeforePriceCents*0.1;
const totalCents=taxCents +totalBeforePriceCents;

let html=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforePriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
     `;
    document.querySelector('.js-payment-summary').innerHTML=html;
}