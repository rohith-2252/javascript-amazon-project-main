import {cart} from '../data/cart.js';
import { getProduct} from '../data/products.js';
import { getDeliveryOption } from '../data/delieveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary(){

    let productPriceCents = 0 ;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) =>{
        const product = getProduct(cartItem.productId);
        console.log(cartItem);
        productPriceCents+=product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    
        
    });  
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = `
            <div class="payment-summary">
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items <p class="js-checkout-header-counter"> </p></div>
                <div class="payment-summary-money"
                    >$${formatCurrency(productPriceCents)}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                    $${formatCurrency(shippingPriceCents)}
                </div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
                    $${formatCurrency(totalBeforeTax)}
                </div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">
                    $${formatCurrency(taxCents)}
                </div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                    $${formatCurrency(totalCents)}
                </div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
          `;
          document.querySelector('.js-payment-summary').innerHTML=
            paymentSummaryHTML;
    }
    
