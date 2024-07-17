export const cart=[
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:3
  }
];

 export function addToCart(productId)
 {
  const selector = document.querySelector(
  `.js-quantity-selector[data-product-id="${productId}"]`
);
const selectedQuantity = parseInt(selector.value, 10);

    let matchingItem = cart.find((item) => item.id === productId);

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        id: productId,
        quantity: selectedQuantity,
      });
    }
 }
 
 export function updateCartQuantity(productId)
 {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    document.querySelector(".cart-quantity").innerHTML = String(totalQuantity);
   
 }