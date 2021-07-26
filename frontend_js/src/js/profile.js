/** 
 
 * Profile page
 * Update and delete profile  

**/

// variables
const form = document.querySelector("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const updateButton = document.getElementById("update_button");
const deleteButton = document.getElementById("delete_button");
const password = document.getElementById("password");
const verifyPassword = document.getElementById("verifyPassword");
let id = localStorage.userId;

// Update profile
function updateProfile() {
  fetch("http://localhost:3000/profile/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      status = response.status;
      if (status == 404) {
        alert("Field empty or invalid");
        return response.json();
      }
      if (status == 403) {
        alert("Email adress invalid");
        return response.json();
      } 
    if (status == 401) {
      alert("Email already in use");
    } else {
        alert("profile updated !");
        window.location.href = "home.html";
      }
    })
    /* .then(function (data) {
        console.log(data);
        alert("profile updated !")
        window.location.href = "home.html";
      }) */
    .catch(function (error) {
      return error;
    });
}

// Delete profile
function deleteProfile() {
  fetch("http://localhost:3000/profile/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.token}`,
    },
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

// Execution
updateButton.addEventListener("click", (e) => {
   let valid = true;
  e.preventDefault();

  if (valid) {
   if (verifyPassword.value != password.value) {
     alert("Passwords are differents !");
     return error;
   }
    else {
      updateProfile();
   }
 }
  
});

deleteButton.addEventListener("click", (e) => {
  if (confirm("Delete profile ?")) {
    e.preventDefault();
    deleteProfile();
  }
});

/****************************************** Error messages ***************************************/
const errorUsername = document.getElementById("error_username");
const errorEmail = document.getElementById("error_email");

username.addEventListener("blur", () => {
  if (!username.checkValidity()) {
    errorUsername.textContent = "username invalid";
    errorUsername.setAttribute = "class";
    errorUsername.className = "w3-text-red w3-margin-left";
    return false;
  } else {
    errorUsername.textContent = "";
  }
});

email.addEventListener("blur", () => {
  if (!email.checkValidity()) {
    errorEmail.textContent = "mail adress invalid";
    errorEmail.setAttribute = "class";
    errorEmail.className = "w3-text-red w3-margin-left";
  } else {
    errorEmail.textContent = "";
  }
});
