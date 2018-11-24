// Assign selectors
const removeButton = document.querySelectorAll('.btn-danger'),
  quantityInput = document.querySelectorAll('.cart-quantity-input'),
  token = localStorage.getItem('authToken');
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  removeButton.forEach(button => button.addEventListener('click', removeProduct));
  quantityInput.forEach(input => input.addEventListener('change', quantityChanged));
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  if (Number.isNaN(event.target.value) || event.target.value <= 0) {
    event.target.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let total = 0;
  const cartItemContainer = document.querySelectorAll('.cart-items')[0],
    cartRows = cartItemContainer.querySelectorAll('.cart-row');
  cartRows.forEach((cart) => {
    const priceElement = cart.querySelectorAll('.cart-price')[0];
    const quantityElement = cart.querySelectorAll(
      '.cart-quantity-input',
    )[0];
    const price = parseInt(priceElement.innerText.replace(/\W/gi, ''));
    const quantity = Number(quantityElement.value);
    total += (price * quantity);
  });
  document.querySelectorAll('.cart-total-price')[0].innerText = `#${total}`;
}

function addToCartButton(event) {
  const product = event.target.parentElement.parentElement,
    title = product.querySelectorAll('.product-name')[0].innerText,
    price = product.querySelectorAll('.product-price')[0].innerText,
    image = product.querySelectorAll('.product-image')[0].src;
  addItemToCart(title, price, image);
  updateCartTotal();
}

function addItemToCart(title, price, image) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelectorAll('.cart-items')[0],
    cartItemNames = document.querySelectorAll('.cart-item-title');
  cartItemNames.forEach((cartItemName) => {
    if (cartItemName.innerText === title) {
      throw new Error('item already added');
    }
  });
  const cartRowContent = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${image}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" min="1" value="1">
      <button class="btn-danger" type="button">X</button>
  </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeProduct);
  cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged);
}
/** Get Products */
fetch('https://store-manager-store.herokuapp.com/api/v1/products', {
  headers: {
    'x-access-token': token,
  },
})
  .then(res => res.json())
  .then((data) => {
    let output = '';
    const items = data.products.value;
    if (items.length === 0) {
      document.querySelector('.products').innerHTML = `
        <h1>No products available</h1>
      `;
    }
    items.forEach((item) => {
      output += `
     <div class="product">
      <img src=${item.product_image} class="product-image">   
      <p class="product-name">${item.name}</p>
      <p class="product-price">#${item.price.toLocaleString()}</p>
      <p>
        <button class="product-button" type="button">ADD TO CART</button>
      </p>
      </div>
    `;
    });
    document.querySelector('.products').innerHTML = output;
    const addToCart = document.querySelectorAll('.product-button');
    addToCart.forEach(item => item.addEventListener('click', addToCartButton));
  });
/** Search for products */
const searchProduct = document.getElementById('search');

searchProduct.addEventListener('keyup', (e) => {
  const a = e.target.value.toLowerCase();
  const b = document.querySelectorAll('.product-name');
  b.forEach((element) => {
    const item = element.firstChild.textContent;
    if (item.toLowerCase().indexOf(a) !== -1) {
      element.style.display = 'block';
      element.parentElement.style.display = 'block';
    } else {
      element.style.display = 'none';
      element.parentElement.style.display = 'none';
    }
  });
});
