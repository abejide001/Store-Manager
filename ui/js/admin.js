const tok = localStorage.getItem('authToken');
const decoded = jwt_decode(tok);
if (decoded.userId === 'admin') {
  window.location.replace('./admin.html');
}
