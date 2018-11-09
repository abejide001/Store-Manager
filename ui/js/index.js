const token = localStorage.getItem('authToken');
const login = document.getElementById('login_link');
const admin = document.getElementById('admin_link');
if (!token) {
  login.innerHTML = `
     <a href="./login.html">Login</a>   
  `;
} else {
  login.innerHTML = `
     <a href="./login.html" id="logout">Logout</a>   
  `;
  admin.innerHTML = `
     <a href="./admin.html">Admin</a>   
  `;
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('authToken');
  });
}
