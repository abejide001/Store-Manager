// Get modal element
const modal = document.getElementById("simpleModal");
// Get open modal button
const modalBtn = document.querySelectorAll("button");
// Get close button
const closeBtn = document.getElementsByClassName("closeBtn")[0];
const admin = document.getElementById('admin');
const token = localStorage.getItem('authToken');
const decode = jwt_decode(token);
// Listen for open click
modalBtn.forEach(item =>
  item.addEventListener("click", () => (modal.style.display = "block"))
);
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
