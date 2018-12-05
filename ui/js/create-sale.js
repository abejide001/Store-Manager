const token = localStorage.getItem('authToken');
const productName = document.getElementById('product-name');
const quantitySold = document.getElementById('quantity');
const submitForm = document.querySelector('.submission-form');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('https://store-manager-store.herokuapp.com/api/v1/sales', {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      product_name: productName.value,
      quantity_sold: quantitySold.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'success') {
        window.location.href = './attendant.html';
      }
    });
});
