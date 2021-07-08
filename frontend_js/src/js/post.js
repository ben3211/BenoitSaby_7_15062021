/** 
 
 * home.html page
 * creat and Display users post  

**/

// Post button
const postButton = document.getElementById("postButton");
// Element selection to display
const postSection = document.getElementById("postSection");
const content = document.getElementById("content");

function getAllPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => {
      return response.json();
    })
    .then((posts) => {
      displayAllPosts(posts);
      console.log(posts);
      return posts;
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayAllPosts(posts) {
  posts.reverse(posts.createdAt).forEach((posts) => {
    postSection.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                       <img src="" alt="avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                       <span class="w3-right w3-opacity">Date : ${posts.date} at ${posts.time}</span>
                       <h4>${posts.username}</h4><br>
                       <hr class="w3-clear">
                       <p><br>${posts.content}</p>
                       <div class="w3-row-padding" style="margin:0 -16px">
                          <p>image</p>
                       </div>
                       <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button> 
                       <button type="commentButton" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button>
                       <button type="button" id="deleteButton" class="w3-button w3-right w3-theme-d2 w3-margin-bottom"><i class="fa fa-trash"></i>
                     Delete</button> 
                       <section id="commentSection></section>
                    </div>`;
  });
}

// Execution
postButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: content.value,
      fk_userId: localStorage.getItem("userId"),
    }),
  })
  .then((response) => {
   return response.json();
 })
 .then((data) => {
   console.log(data);
   location.reload();
 })
 .catch((error) => {
   console.log(error);
 });
  
  
  
  /* 
  .then((response) => {
    if (response.ok) {response
        .json()
        .then((data) => {
          console.log(data);
          location.reload();
        })
        .catch((error) => console.error("error:" + error));
    }
  }); */
});

getAllPosts();
