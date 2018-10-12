// Assign selectors
const removeButton = document.querySelectorAll(".btn-danger"),
  addToCart = document.querySelectorAll(".product-button"),
  quantityInput = document.querySelectorAll(".cart-quantity-input");
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  removeButton.forEach(button => button.addEventListener("click", removeProduct));
  addToCart.forEach(item => item.addEventListener("click", addToCartButton));
  quantityInput.forEach(input => input.addEventListener("change", quantityChanged));
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  if (Number.isNaN(event.target.value) || event.target.value <= 0) {
    event.target.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let total = 0;
  const cartItemContainer = document.querySelectorAll(".cart-items")[0],
  cartRows = cartItemContainer.querySelectorAll(".cart-row");
  cartRows.forEach(cart => {
    const priceElement = cart.querySelectorAll(".cart-price")[0];
    const quantityElement = cart.querySelectorAll(
      ".cart-quantity-input"
    )[0];
    const price = parseInt(priceElement.innerText.replace(/\W/gi, ''));
    const quantity = Number(quantityElement.value);
    total += (price * quantity);
  });
  document.querySelectorAll(".cart-total-price")[0].innerText =
    "#" + total;
}

function addToCartButton(event) {
  const product = event.target.parentElement.parentElement,
    title = product.querySelectorAll(".product-name")[0].innerText,
    price = product.querySelectorAll(".product-price")[0].innerText,
    image = product.querySelectorAll(".product-image")[0].src;
  addItemToCart(title, price, image);
  updateCartTotal()
}

function addItemToCart(title, price, image) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.querySelectorAll(".cart-items")[0],
      cartItemNames = document.querySelectorAll('.cart-item-title');
      cartItemNames.forEach(cartItemName => {
        if (cartItemName.innerText === title) {
          throw new Error('item already added')
        }
      })
  const cartRowContent = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${image}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn-danger" type="button">X</button>
  </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeProduct)
  cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged)
}