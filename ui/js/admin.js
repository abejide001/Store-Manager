const tok = localStorage.getItem('authToken');
const decoded = jwt_decode(tok);
if (decoded.userId === 'user') {
  window.location.replace('./attendant.html');
}
