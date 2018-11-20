const checkAttendant = localStorage.getItem('authToken');
const decoded = jwt_decode(checkAttendant);
if (decoded.userId === 'user') {
  window.location.replace('./attendant.html');
}
