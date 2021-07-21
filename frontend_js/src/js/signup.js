/** 
 
 * signup.js page
 * Signup form

**/

// Varaibles
const form = document.querySelector("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const verifyPassword = document.getElementById("verifyPassword");

const signupButton = document.getElementById("signupButton");

form.addEventListener("change", function () {
  // Ok
  if (
    username.checkValidity() &&
    email.checkValidity() &&
    password.checkValidity() &&
    verifyPassword.value.length >= 4
  ) {
    // error
    signupButton.removeAttribute("disabled");
  }
});

/********************************* Check validity and request *************************************/

// Fetch
signupButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Api validation
  let valid = true;
  for (let input of document.querySelectorAll(
    'input[type="text"], input[type="email"]'
  )) {
    valid = valid && input.reportValidity();
    if (!valid) {
      break;
    }
  }
  if (valid) {
    if (verifyPassword.value != password.value) {
      alert("Password are differents !");
      return error;
    }
     else {
      signup();
    }
  }
});

/****************************************** Request ***************************************/

function signup() {
  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
       status = response.status;
       if (status == 201) {
         window.location.href = "../../index.html";
         return response.json();
       } else {
          alert("Email already in use");
       }
    })
    .catch( (error) => {
      console.log(error);
    });

}

/****************************************** Error messages ***************************************/
const usernameValidity = document.getElementById("username");
const emailValidity = document.getElementById("email");
const passworValidity = document.getElementById("password");

const error_username = document.getElementById("error_username");
const error_email = document.getElementById("error_email");
const error_password = document.getElementById("error_password");

usernameValidity.addEventListener("blur", () => {
  if (!usernameValidity.checkValidity()) {
    error_username.textContent = "username invalid";
    error_username.setAttribute = "class";
    error_username.className = "w3-text-red w3-margin-left";
  } else {
    error_username.textContent = "";
  }
});

emailValidity.addEventListener("blur", () => {
  if (!emailValidity.checkValidity()) {
    error_email.textContent = "mail adress invalid";
    error_email.setAttribute = "class";
    error_email.className = "w3-text-red w3-margin-left";
  } else {
    error_email.textContent = "";
  }
});

passworValidity.addEventListener("blur", () => {
  if (!passworValidity.checkValidity()) {
    error_password.textContent = "Please rise up password complexity";
    error_password.setAttribute = "class";
    error_password.className = "w3-text-red w3-margin-left";
  } else {
    error_password.textContent = "";
  }
});
