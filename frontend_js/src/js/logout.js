const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', (e) => {
   localStorage.clear();
   document.location.href='../../index.html';
});