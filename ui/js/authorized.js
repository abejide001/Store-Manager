const authorized = localStorage.getItem('authToken');
if (authorized) {
  window.location.replace('index.html');
}
