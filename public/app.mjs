  let allPost = document.querySelector("#allPosts")
    let result = document.querySelector("#result")
    let createPost = document.querySelector("#createPost")
let postTitle = document.querySelector("#postTitle")
let postText = document.querySelector("#postText")
 let mybody =   document.getElementById("mybody")
 let deletePost;
 let edit;
// <i class="fa-solid fa-trash-can"></i>
// <i class="fa-solid fa-trash-can fa-bounce"></i>
// <i class="fa-solid fa-pen-to-square"></i>
// <i class="fa-solid fa-pen"></i>
 createPost.addEventListener ("click", (e)=>{
   
 e.preventDefault()
   
//  console.log(postTitle.value)
//     console.log(postText.value)
  

axios.post(`/api/v1/post`, {
    title: postTitle.value,
    text : postText.value
})
.then(function(response){
console.log(response.data)
alert(response.data)
// console.log("post created")
getAllPosts()   
 postTitle.value = ''
postText.value = ''
})


.catch(function(error){ 
    // console.log("error in creating post")
    console.log(error.data)
    result.innerHTML = "Error in Posting"
   
})
 })

let getAllPosts = () => {
    axios.get(`/api/v1/posts`)
      .then(function (response) {
        console.log(response.data);
        const reversedPosts = response.data.reverse();
        // Clear the current content in allPost
        allPost.innerHTML = "";
  
        reversedPosts.forEach(post => {
          const postCard = document.createElement("div");
          postCard.classList.add("post-card");
  
          const postTitleDiv = document.createElement('div');
          postTitleDiv.classList.add("postTitleDiv")
          postTitleDiv.innerHTML = post.title;
          const fontIcons = document.createElement("div")
          fontIcons.classList.add('fontIcons')
          edit = document.createElement('button')
          edit.textContent = 'Edit Post'
  
          deletePost = document.createElement('button')
          deletePost.textContent = 'Delete Post'
          deletePost.addEventListener('click', (e) => {
            e.preventDefault();
            // Make the delete request for the specific post ID
            axios.delete(`/api/v1/post/${post.id}`)
              .then(function (response) {
                // Remove the postCard from the DOM after successful deletion
               
               postCard.remove();
               
               
               alert("Post Deleted") 
                
              })
              .catch(function (error) {
                console.log("Error in deleting the post");
              });
          });
  
          edit.addEventListener('click', (e) => {
            e.preventDefault();
          
            // Show SweetAlert popup for editing post
            Swal.fire({
              title: 'Edit Post',
              html: `
              <label for="updatedTitle" class="swal2-label">Post Title:</label><br><input type="text" id="updatedTitle" value="${post.title}" class="swal2-input" placeholder="Title" required><br>
              <label for="updatedText" class="swal2-label">Post Text:</label> <br> <input type="text" id="updatedText" value= "${post.text}"  class="swal2-input" ></input>`,
              confirmButtonText: 'Edit',
              focusConfirm: false,
              preConfirm: () => {
                const updatedTitle = Swal.getPopup().querySelector('#updatedTitle').value;
                const updatedText = Swal.getPopup().querySelector('#updatedText').value;
                return { updatedTitle, updatedText };
              }
            }).then((result) => {
              if (result.isConfirmed) {
                const { updatedTitle, updatedText } = result.value;
          
                // Make the PUT request for the specific post ID with updated data
                axios.put(`/api/v1/post/${post.id}`, {
                  title: updatedTitle,
                  text: updatedText
                })
                  .then(function (response) {
                    postCard.contentEditable = true;
                    postTitleDiv.innerHTML = updatedTitle;
                    postTextDiv.innerHTML = updatedText;
                  })
                  .catch(function (error) {
                    console.log("Error in editing the post");
                  });
              }
            });
          });
  
          const postTextDiv = document.createElement('p');
          postTextDiv.classList.add("postTextDiv")
          postTextDiv.innerHTML = post.text;
  
          postCard.appendChild(postTitleDiv);
          postCard.appendChild(fontIcons)
          fontIcons.appendChild(edit)
          fontIcons.appendChild(deletePost)
  
          postCard.appendChild(postTextDiv);
          allPost.appendChild(postCard);
        });
      })
      .catch(function (error) {
        console.log(error.data);
        allPost.innerHTML = "Error in Getting Post";
      })
  }
  
// getAllPosts() 

mybody.addEventListener('load', getAllPosts())