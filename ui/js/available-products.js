// Get modal element
const modal = document.getElementById("simpleModal");
// Get open modal button
// Get close button
const closeBtn = document.getElementsByClassName("closeBtn")[0];
const admin = document.getElementById('admin');
const token = localStorage.getItem('authToken');
const decode = jwt_decode(token);
// Listen for open click

// Listen for close click
closeBtn.addEventListener("click", closeModal);
// Listen for outside click
window.addEventListener("click", outsideClick);
// Function to close modal
function closeModal() {
  modal.style.display = "none";
}

// Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

if (decode.userId === 'user') {
  admin.innerHTML = `
   <a href="./attendant.html">Attendant</a>    
  `;
} else {
  admin.innerHTML = `
  <a href="./attendant.html">Admin</a>    
 `;
}
fetch('https://store-manager-store.herokuapp.com/api/v1/products', {
  headers: {
    'x-access-token': token,
  },
})
  .then(res => res.json())
  .then((data) => {
    let output = '';
    const items = data.products.value;
    document.getElementById('available-header').textContent = `
        ${items.length} Available Products  
    `;
    items.forEach((item) => {
      output += `
     <div class="product-item">
      <img src=${item.product_image} class="product-image">   
      <p>
      <button class="modalBtn" type="submit" onclick=getProductDetails(${item.id})>Details</button>
      </p>
      </div>
    `;
    });
    document.querySelector('.products').innerHTML = output;
    const modalBtn = document.querySelectorAll("button");
    modalBtn.forEach(item =>
      item.addEventListener("click", () => modal.style.display = 'block')
    );
  });

function getProductDetails(id) {
  fetch(`https://store-manager-store.herokuapp.com/api/v1/products/${id}`, {
    headers: {
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      const item = data.product.value;
      document.querySelector('.modal-body').innerHTML = `
    <p>Quantity In Inventory -${item.quantity_in_inventory}</p>
    <p>Product Name -${item.name}</p>
    <p>Price -${item.price}</p>
  `;
    });
}
