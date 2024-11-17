import { cart, cartQuantity, removeFromCart,  updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";


let cartSummaryHTML = ``;

// Generate cart summary HTML
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Find matching product
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // Find matching delivery option
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) deliveryOption = option;
  });

  // Calculate delivery date
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  // Add product details to cart summary
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
                  data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    </div>`;
});

// Function to generate delivery options HTML
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ``;
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? `FREE - `
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProduct.id}" 
                data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" 
                ${isChecked ? "checked" : ""} 
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
            </div>`;
  });
  return html;
}

// Render the cart summary HTML
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// Attach event listeners for delete links
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    // Remove the product container from the DOM
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});

// Attach event listeners for delivery options
document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;

    // Update delivery option in the cart
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

// Update cart quantity in the DOM
document.querySelector(".return").innerHTML = cartQuantity; 