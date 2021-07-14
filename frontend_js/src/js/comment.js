/** 
 
 * comment page page
 * Creat and display comments 

**/

// Variables declarations
// Post
const postSection = document.getElementById("postSection");

// Display post
function displayOnePost(post) {
  postSection.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                              <img src="../../public/img/avatar2.png" alt="avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                              <span class="w3-right w3-opacity w3-small">Post : ${post[0].date} at ${post[0].time}</span>
                              <a href="#" class="profile_link" style="text-decoration:none"<h4>${post[0].username}</h4><br></a>
                              <hr class="w3-clear">
                              <p><br>${post[0].content}</p>

                              <div class="w3-rest w3-padding">
                              <p>
                              <textarea class="w3-input w3-border" id="commentContent" placeholder="Want to say something ?" style="resize:none"></textarea>
                              </p>
                                 <button type="commentButton" class="w3-button w3-theme"><i class="fa fa-comment"></i>
                                 Comment</button>
                               </div>
                           </div>
                           <section id="section__comments${post[0].id}></section>`;
};

/* // Send comment
commentButton.addEventListener("click", (e) => {
   fetch("http://localhost:3000/" + comment.id, {
      method: 'post',
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
         commentContent: content.value 
     })
   })
   .then (response => {
      if (response.ok) {
          response.json()
          .then( comments => {
              generationComments(comments);
              location.reload();
          })
      }
  })
  .catch (error => console.log(error))
 }); */


// Display comments
function displayAllComments(comments) {
  posts.reverse(comments.createdAt).forEach((comments) => {
   
  });
};

// Get one post
function getPostId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("id");
  return product;
}
const id = getPostId();
console.log(id);

fetch("http://localhost:3000/" + id, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.token}`,
  },
})
  .then((response) => {
    console.log("response:", response);
    return response.json();
  })
  .then((post) => {
    console.log(post);
    displayOnePost(post);
  })
  .catch((error) => {
    console.log(error);
  });
