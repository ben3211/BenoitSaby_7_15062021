/** 
 
 * index.html page
 * Login form and signup direction 

**/

/****************************************** START - Form managemnt ***************************************/
// Varaibles
const loginButton = document.getElementById("login-button");

// Fetch
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  }).then((response) => {
   status = response.status;
    if (response.ok) {
      response
        .json()
        .then((data) => {
          console.log(data);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.token);
          localStorage.setItem("isAdmin", data.isAdmin);
          window.location.href = "./src/views/home.html";
        })
    } 
    if (status == 404) {
      alert("username not found");
     }
     if (status == 401) {
      alert("Wrong password");
     }
  });
});

/****************************************** END - Form managemnt *****************************************/
