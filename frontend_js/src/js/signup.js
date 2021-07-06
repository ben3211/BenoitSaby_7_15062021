/** 
 
 * signup.js page
 * Signup form

**/

/****************************************** START - Request ***************************************/
// Varaibles
const loginButton = document.getElementById('signup-button');
const form = document.querySelector('form');

// Fetch
loginButton.addEventListener('click', (e) => {
   e.preventDefault(),
   fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
         "content-type" : "application/json"
      },
      body: JSON.stringify({
         username: username.value,
         email: email.value,
         password: password.value
      })
   })
   .then((response) => {
      return response.json()
   })
   .then (function(data) {
      console.log(data)
      window.location.href = '../../index.html'
   })
   .catch(function(error) {
      return (error)
   })
});



/****************************************** END - Request *****************************************/

/****************************************** START - Form managemnt ***************************************/
// Check validity 
/* loginButton.addEventListener('click', (e) => {
   let valid = true;
   for (let input of document.querySelectorAll('input[type="text"], input[type="email"]')) {

      valid = valid && input.reportValidity ();
      if (!valid) {
          break;                                                     
      }
   }
   if (valid) {                            
      signup ();
   }
}); */
/****************************************** START - Form managemnt ***************************************/

