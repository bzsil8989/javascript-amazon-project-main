 export const cart=[];
 export function addToCart(productId)
 {
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