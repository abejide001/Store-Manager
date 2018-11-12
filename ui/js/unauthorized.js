const auth = localStorage.getItem('authToken');
if (!auth) {
  window.location.replace('./login.html ');
}
