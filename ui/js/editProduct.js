const token = localStorage.getItem('authToken');
const image = document.getElementById('image');
const price = document.getElementById('price');
const name = document.getElementById('product_name');
const quantityInInventory = document.getElementById('inventory');
const submitForm = document.querySelector('.submission-form');

/** Function to search params */
const getUrlParameter = (parameter) => {
  parameter = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + parameter + '=([^&#]*)');
    var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const id = (getUrlParameter('id'));
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`https://store-manager-store.herokuapp.com/api/v1/products/${id}`, {
    method: 'PUT',
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
