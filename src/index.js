const fetchImagesURL = "http://localhost:3000/images";
const fetchCommentURL = "http://localhost:3000/comments";
const likeButtonElement = document.querySelector("button#fg-like-button");
const likeCountElement = document.querySelector("span#fg-likes");
const commentInputElement = document.querySelector("input.comment-input")
const commentButtonElement = document.querySelector("button.comment-button")
const commentPostElementParent = document.querySelector("ul#fg-comments");
const commentFormElement = document.querySelector("form#fg-comment-form")
const imageTitleElement = document.querySelector("h2#fg-title");
const imageContentElement = document.querySelector("img#fg-image");

let likeCount = 0;
let imageObjectArray = [];
let commentObjectArray = [];
fetch(fetchImagesURL)
.then(response => response.json()) // json() is a function! remember to put ()
.then(jsonObject => {
    saveObjectArray(imageObjectArray, jsonObject)
    listenLikeEvent();
    listenPostEvent();
    displayPostContent();

});

fetch(fetchCommentURL)
.then(response => response.json()) // json() is a function! remember to put ()
.then(jsonObject => {
    saveObjectArray(commentObjectArray, jsonObject)
    loadPrevious();
});

function saveObjectArray(saveTarget, jsonObjectFetched) {
    for (let i = 0; i < jsonObjectFetched.length; i++) {
        saveTarget.push(jsonObjectFetched[i]);
    }
}

// console.log("image object array is fetched:")
// console.log(imageObjectArray);
// console.log("comment object array is fetched:")
// console.log(commentObjectArray);
// console.log(commentObjectArray[1]);


function displayPostContent() {
    imageTitleElement.innerText = imageObjectArray[0].title;
    imageContentElement.src = imageObjectArray[0].image;
}

function loadPrevious() {
    likeCount = imageObjectArray[0].likes;
    for (let i = 0; i < commentObjectArray.length; i++) {
        let newPost = document.createElement("li");
        newPost.innerText = commentObjectArray[i].content;
        commentPostElementParent.append(newPost);
    }
}

function listenLikeEvent() {
    likeButtonElement.addEventListener("click", function() {
        likeCount++;
        likeCountElement.innerText = likeCount + " likes";
    })
}

 function listenPostEvent() {
     commentButtonElement.addEventListener("click", function(event) {
        event.preventDefault();
        let newPost = document.createElement("li");
        newPost.innerText = commentInputElement.value;
        commentPostElementParent.append(newPost);
        commentFormElement.reset();
     })
 }