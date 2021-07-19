/** 
 
 * home.html page
 * create and Display users posts  

**/

// New Url post going to comments page
function urlPostAndComment(postId) {
  var url = new URL(window.location.href + "/../comment.html");
  var UrlSearchParams = url.searchParams;
  UrlSearchParams.set("id", postId);
  url.search = UrlSearchParams.toString();
  return (newUrl = url.toString());
}

// Variables declarations
// Posts
const postButton = document.getElementById("postButton");
const postSection = document.getElementById("postSection");
const content = document.getElementById("content");
// Comments
const commentButton = document.getElementById("commentButton");
const displayComment = document.getElementById("display_comment");
const commentDeleteButton = document.getElementById("comment_delete_button");

// Display posts
function displayAllPosts(posts) {
  posts.reverse(posts.createdAt).forEach((posts) => {
    urlPostAndComment(posts.id);
    // If user created the post
    if ((localStorage.userId == posts.fk_userId) || localStorage.isAdmin == 1) {
      postSection.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                                    <img src="../../public/img/avatar2.png" alt="avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                                    <span class="w3-right w3-opacity w3-small">Post : ${posts.date} at ${posts.time}</span>
                                    <a href="#" class="profile_link" style="text-decoration:none"<h4>${posts.username}</h4><br></a>
                                    <hr class="w3-clear">
                                    <p><br>${posts.content}</p>

                                    <div class= w3-bar w3-container w3-tiny>
                                       <button type="button" class="w3-button w3-tiny w3-round-xxlarge w3-green"><i class="fa fa-thumbs-up"></i>Like</button> 
                                       <button type="button" id="deleteButton${posts.id}" class="w3-button w3-tiny w3-red w3-round-xxlarge"><i class="fa fa-trash"></i>
                                       delete</button>
                                       <button type="button" id="modifyButton" class="w3-button w3-tiny w3-indigo w3-round-xxlarge"><i class="fa fa-fingerprint"></i>
                                       Modify</button>
                                    </div>
                                    

                                    <div class="w3-row w3-section">
                                       <div class="w3-rest">
                                          <a class="link__post w3-text-blue w3-margin-left" href="${newUrl}" style="text-decoration:none">See or comments..<a>
                                       </div>
                                    </div>
                                 </div>`;

      // Delete button
      const deleteButton = document.getElementById(`deleteButton${posts.id}`);
      deleteButton.addEventListener("click", (e) => {
        if (confirm("Delete post ?")) {
          fetch("http://localhost:3000/" + posts.id, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${localStorage.token}`,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then(function (data) {
              console.log(data, "Post deleted");
              location.reload();
            })
            .catch(function (error) {
              return error;
            });
        }
      });

      // For the other users
    } else {
      postSection.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                                    <img src="../../public/img/avatar2.png" alt="avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                                    <span class="w3-right w3-opacity w3-small">Post : ${posts.date} at ${posts.time}</span>
                                    <a href="#" class="profile_link" style="text-decoration:none"<h4>${posts.username}</h4><br></a>
                                    <hr class="w3-clear">
                                    <p><br>${posts.content}</p>
                                    <div class="w3-row-padding" style="margin:0 -16px">
                                    <div class= w3-bar w3-container>
                                       <button type="button" class="w3-button w3-margin w3-tiny w3-round-xxlarge w3-green"><i class="fa fa-thumbs-up"></i>Like</button> 
                                    </div>
                                    <div class="w3-row w3-section">
                                       <div class="w3-rest">
                                          <a class="link__post w3-text-blue w3-margin-left" href="${newUrl}" style="text-decoration:none">See or comments..<a>
                                       </div>
                                    </div>
                                 </div>`;
    }
  });
}

// Execution
postButton.addEventListener("click", (e) => {
  e.preventDefault();
  addPost();
  getAllPost();
});

function addPost() {
  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      content: content.value,
      fk_userId: localStorage.getItem("userId"),
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then(function () {
      console.log("Post added");
    })
    .catch(function (error) {
      return error;
    });
}

// Get all post
function getAllPost() {
  fetch("http://localhost:3000/posts", {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  })
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
getAllPost();
