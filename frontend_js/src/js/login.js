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
    if (response.ok) {
      response.json()
        .then((data) => {
          console.log(data);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.token);
          window.location.href = "./src/views/home.html";
        })
        .catch(error => console.error("error:" + error));
        console.log("username or password invalid")
    }
  });
});

/****************************************** END - Form managemnt *****************************************/
