const butt = document.querySelector('.login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const alert = document.querySelector('.alert');
butt.addEventListener('submit', (e) => {
  fetch('http://localhost:3000/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.status === 'error') {
        document.querySelector('.inner').innerHTML = 'Wrong credentials';
        alert.style.display = ' block';
        setTimeout(() => {
          alert.style.display = 'none';
        }, 3000);
      } else {
        localStorage.setItem('authToken', data.token);
        const decoded = jwt_decode(data.token);
        window.location = decoded.userId === 'admin' ? './admin.html' : 'attendant.html';
      }
    })
    /* eslint-disable no-console */
    .catch(error => console.log(error.message));
  e.preventDefault();
});
