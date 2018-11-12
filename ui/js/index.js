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
  const decoded = jwt_decode(token);
  if (decoded.userId === 'admin') {
    admin.innerHTML = `
     <a href="./admin.html">Admin</a>   
  `;
  } else {
    admin.innerHTML = `
     <a href="./attendant.html">Attendant</a>   
  `;
  }
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('authToken');
  });
}
