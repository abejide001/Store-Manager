const unauthorized = localStorage.getItem('authToken');
if (!unauthorized) {
  window.location.replace('./login.html ');
}
