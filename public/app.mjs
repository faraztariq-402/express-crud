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
result.innerHTML = response.data
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

//  Swal.fire({
//     title: 'Submit your Github username',
//     input: 'text',
//     inputAttributes: {
//       autocapitalize: 'off'
//     },
//     showCancelButton: true,
//     confirmButtonText: 'Look up',
//     showLoaderOnConfirm: true,
//     preConfirm: (login) => {
//       return fetch(`//api.github.com/users/${login}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(response.statusText)
//           }
//           return response.json()
//         })
//         .catch(error => {
//           Swal.showValidationMessage(
//             `Request failed: ${error}`
//           )
//         })
//     },
//     allowOutsideClick: () => !Swal.isLoading()
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: `${result.value.login}'s avatar`,
//         imageUrl: result.value.avatar_url
//       })
//     }
//   })

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
              })
              .catch(function (error) {
                console.log("Error in deleting the post");
              });
          });
  
          edit.addEventListener('click', (e) => {
            e.preventDefault();
            // Assuming you have a form to get the updated title and text
            const updatedTitle = prompt("Enter updated title:", post.title);
            const updatedText = prompt("Enter updated text:", post.text);
          
            // Make the put request for the specific post ID with updated data
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