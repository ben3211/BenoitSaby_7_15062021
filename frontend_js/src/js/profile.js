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
let id = localStorage.userId;

// Update profile
function updateProfile () {
   fetch("http://localhost:3000/profile/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        alert("profile updated !")
        window.location.href = "home.html";
      })
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
   e.preventDefault();
   updateProfile ();
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
   errorUsername.setAttribute = ('class');
   errorUsername.className = ('w3-text-red w3-margin-left');
   e.preventDefault();
   return false;
  } else {
   errorUsername.textContent = "";
  }
});

email.addEventListener("blur", () => {
  if (!email.checkValidity()) {
   errorEmail.textContent = "mail adress invalid";
   errorEmail.setAttribute = ('class');
   errorEmail.className = ('w3-text-red w3-margin-left');
  } else {
   errorEmail.textContent = "";
  }
});

// check validity
/* form.addEventListener("change", function () {
   // Ok
   if (
     username.checkValidity() &&
     email.checkValidity()
   ) {
     // Error
     updateButton.removeAttribute("disabled");
   }
 }); */