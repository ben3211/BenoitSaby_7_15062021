/** 
 
 * comment page page
 * Creat and display comments 

**/

// Variables declarations
// Post
const postSection = document.getElementById("postSection");
const commentSection = document.getElementById("comments_section");

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
                                 <button id="comment_button" type="comment_button" class="w3-button w3-theme"><i class="fa fa-comment"></i>
                                 Comment</button>
                               </div>
                               <section id="comments_section"></section>
                           </div>`;

  // Create comment
  // variables
  const commentContent = document.getElementById("commentContent");
  const commentButton = document.getElementById("comment_button");
  // Function
  commentButton.addEventListener("click", (e) => {
    fetch("http://localhost:3000/comment/" + id, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        content: commentContent.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((comments) => {
            displayComments(comments);
            location.reload();
          });
        }
      })
      .catch((error) => console.log(error));
  });
}

// Display comments
function displayComments(comments) {
  comments.forEach((comments) => {
    if (localStorage.userId == comments.fk_userId) {
      comments_section.innerHTML += `<section class="w3-small w3-margin w3-padding">
                                       <span class="w3-right w3-opacity w3-small">Post : ${comments.date} at ${comments.time}</span>
                                       <a href="#" class="profile_link" style="text-decoration:none" style="width:50%"<h4>${comments.username}</h4><br></a>
                                       <hr class="w3-clear">
                                       <p><br>${comments.content}</p>
                                       <button id="comment_delete_button${comments.id}" type="button" class="w3-button w3-theme">delete<i class="fa fa-times-circle"></i></button>
                                       <button type="button" id="deleteButton${comments.id}" class="w3-button w3-margin w3-small w3-red"><i class="fa fa-trash"></i>
                                       delete</button>
                                    </section>`;

      /*  const commentDeleteButton = document.getElementById(`deleteButton${comments.id}`); */
      document
        .getElementById(`deleteButton${comments.id}`)
        .addEventListener("click", (e) => {
          console.log("click");
          if (confirm("Delete post ?")) {
            fetch("http://localhost:3000/comment/" + comments.id, {
              method: "DELETE",
              headers: {
               "Content-type": "application/json; charset=UTF-8",
               "Authorization": `Bearer ${localStorage.token}`
              },
            })
              .then((response) => {
                if (response.ok) {
                  response
                    .json()
                    .then((response) => {
                      location.reload();
                      res.status(201).json({ response });
                    })
                    .catch((error) => console.log(error));
                }
              })
              .catch((error) => res.status(500).json({ error: "no put" }));
          }
        });
    } else {
      comments_section.innerHTML += `<section id="display_comment" class="w3-small">
                                       <span class="w3-right w3-opacity w3-small">Post : ${comments.date} at ${comments.time}</span>
                                       <a href="#" class="profile_link" style="text-decoration:none"<h4>${comments.username}</h4><br></a>
                                       <hr class="w3-clear">
                                       <p>Content :<br>${comments.content}</p>
                                    </section>`;
    }
  });
}

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

// Get comments
fetch("http://localhost:3000/comment/" + id, {
  headers: { Authorization: `Bearer ${localStorage.token}` },
})
  .then((response) => {
    console.log("response:", response);
    return response.json();
  })
  .then((comments) => {
    console.log(comments);
    displayComments(comments);
  })
  .catch((error) => {
    console.log(error);
  });
