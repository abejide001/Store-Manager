const email = document.getElementById('email');
const fullname = document.getElementById('fullname');
const password = document.getElementById('password');
const username = document.getElementById('username');
const role = document.getElementById('role');
const alert = document.querySelector('.alert');
const registerForm = document.getElementById('register_form');
const token = localStorage.getItem('authToken');
registerForm.addEventListener('submit', (e) => {
  fetch('https://store-manager-store.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      fullname: fullname.value,
      password: password.value,
      role: role.value,
      username: username.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.role === 'user') {
        localStorage.clear();
        window.location = './login.html';
      }
      if (data.status === 'error') {
        document.querySelector('.inner').innerHTML = `
          <p>${data.message}</p>
        `;
        alert.style.display = ' block';
        setTimeout(() => {
          alert.style.display = 'none';
        }, 3000);
      }
    });
  e.preventDefault();
});
