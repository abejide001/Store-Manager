const image = document.getElementById('image');
const price = document.getElementById('price');
const name = document.getElementById('product-name');
const quantityInInventory = document.getElementById('inventory');
const token = localStorage.getItem('authToken');
document.querySelector('.submission-form').addEventListener('submit', (event) => {
  event.preventDefault();
  fetch('https://store-manager-store.herokuapp.com/api/v1/products', {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      quantity_in_inventory: quantityInInventory.value,
      product_image: image.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'success') {
        window.location.href = './admin.html';
      }
    });
});
