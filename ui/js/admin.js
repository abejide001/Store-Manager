const token = localStorage.getItem('authToken');

if (!token) {
  window.location = './login.html ';
}
