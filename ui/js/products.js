const token = localStorage.getItem('authToken');
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
      document.getElementById('product-header').textContent = `
        No products available
      `;
    }
    items.forEach((item) => {
      output += `
     <div class="product-item">
      <img src=${item.product_image} class="product-image">   
      <p class="product-name">${item.name}</p>
      <p class="product-price">#${item.price.toLocaleString()}</p>
      <p>
      <button class="editBtn" type="submit">Edit</button>
      <button class="deleteBtn" type="submit" onclick=deleteProduct(${item.id})>Delete</button> 
      </p>
      </div>
    `;
    });
    document.querySelector('.products').innerHTML = output;
  });
// Delete Product
function deleteProduct(id) {
  fetch(`https://store-manager-store.herokuapp.com/api/v1/products/${id}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'success') {
        window.location.reload();
      }
    });
}
