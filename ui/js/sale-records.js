const token = localStorage.getItem('authToken');
fetch('https://store-manager-store.herokuapp.com/api/v1/sales', {
  headers: {
    'x-access-token': token,
  },
})
  .then(res => res.json())
  .then((data) => {
    const sales = data.sales.value;
    let output = '';
    sales.forEach((sale) => {
      output += `
        <tr>
            <td>${sale.id}</td>
            <td>${sale.product_name}</td>
            <td>${sale.quantity_sold}</td>
        </tr>
        `;
    });
    document.getElementById('myTable').innerHTML = `
      <tr>
       <th>ID</th>
       <th>Product Name</th>
       <th>Quantity Sold</th>
     </tr>
      ${output}
      `;
  });
