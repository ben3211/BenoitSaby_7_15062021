/** 
 
 * home.html page
 * create and Display users post  

**/

// Const declarations
const postButton = document.getElementById("postButton");
const postSection = document.getElementById("postSection");
const content = document.getElementById("content");

// Display posts
function displayAllPosts(posts) {
  posts.reverse(posts.createdAt).forEach((posts) => {
    // If user created the post
    if (localStorage.userId == posts.fk_userId) {
      postSection.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                                    <img src="../../public/img/avatar2.png" alt="avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                                    <span class="w3-right w3-opacity w3-small">Post : ${posts.date} at ${posts.time}</span>
                                    <a href="#" class="profile_link" style="text-decoration:none"<h4>${posts.username}</h4><br></a>
                                    <hr class="w3-clear">
                                    <p><br>${posts.content}</p>

                                    <div class= w3-bar w3-container>
                                       <button type="button" class="w3-button w3-theme w3-margin w3-small"><i class="fa fa-thumbs-up"></i>Like</button> 
                                       <button type="button" id="deleteButton${posts.id}" class="w3-button w3-margin w3-small w3-red"><i class="fa fa-trash"></i>
                                       delete</button>
                                       <button type="button" id="modifyButton" class="w3-button w3-theme w3-margin w3-small"><i class="fa fa-fingerprint"></i>
                                       Modify</button>
                                    </div>
                                    

                                    <div class="w3-row w3-section">
                                       <button type='button' id="commentButton" class="w3-col w3-button w3-theme" style="width:50px"><i
                                       class="w3-xlarge fa fa-pencil"></i></button>
                                       <div class="w3-rest">
                                          <input class="w3-input w3-border" name="comment" type="text" placeholder="Comment">
                                       </div>
                                    </div>
                                 </div>`;

      // Comment



      // Delete button
      const deleteButton = document.getElementById(`deleteButton${posts.id}`);
      deleteButton.addEventListener("click", (e) => {
        if (confirm("Delete post ?")) {
          fetch("http://localhost:3000/" + posts.id, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${localStorage.token}`
            },
          })
          .then (response => {
            if (response.ok) {
                response.json()
                .then( response =>  {
                    location.reload()
                    res.status(201).json({ response })    
                })
                .catch (error => console.log(error))
            }   
        })
        .catch (error => res.status(500).json({ error: "no put" }))
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
                                       <p>image</p>
                                       <div class="w3-row w3-section">
                                          <button type='button' id="commentButton" class="w3-col w3-button w3-theme" style="width:50px"><i
                                          class="w3-xlarge fa fa-pencil"></i></button>
                                             <div class="w3-rest">
                                             <input class="w3-input w3-border" name="comment" type="text" placeholder="Comment">
                                       </div>
                                    </div>
                                 </div>`;
    }
  });
}

// Execution
postButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`
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
});

// Get all posts
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
