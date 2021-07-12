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
  //Si tout est valide :
  if (
    username.checkValidity() &&
    email.checkValidity() &&
    password.checkValidity() &&
    verifyPassword.value.length >= 8
  ) {
    //Le bouton est cliquable :
    signupButton.removeAttribute("disabled");
  }
});

/********************************* Check validity and request *************************************/

// Fetch
signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (verifyPassword.value != password.value) {
    alert("Password are differents !");
  } else {
    signup();
  }
});

/* // Form validation
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
    e.preventDefault();
    signup();
  }
}); */

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
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      window.location.href = "../../index.html";
    })
    .catch(function (error) {
      return error;
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
  } else {
    error_username.textContent = "";
  }
});

emailValidity.addEventListener("blur", () => {
  if (!emailValidity.checkValidity()) {
    error_email.textContent = "mail adress invalid";
  } else {
    error_email.textContent = "";
  }
});

passworValidity.addEventListener("blur", () => {
  if (!passworValidity.checkValidity()) {
    error_password.textContent = "Please make your password more complex ";
  } else {
    error_password.textContent = "";
  }
});
