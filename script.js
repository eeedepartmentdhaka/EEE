"use strict";

// DOM Elements
const commentForm = document.getElementById("commentForm");
const usernameInput = document.getElementById("username");
const commentInput = document.getElementById("comment");
const commentsList = document.getElementById("commentsList");

// Load comments from localStorage
let comments = JSON.parse(localStorage.getItem("comments")) || [];

// Render all comments
function renderComments() {
  commentsList.innerHTML = ""; // clear old list

  if (comments.length === 0) {
    commentsList.innerHTML = "<p>No comments yet. Be the first to comment! 🎉</p>";
    return;
  }

  comments.forEach((c, index) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    commentDiv.innerHTML = `
      <h4>${c.username}</h4>
      <p>${c.text}</p>
      <span class="timestamp">${c.time}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    commentsList.appendChild(commentDiv);
  });
}

// Add new comment
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const text = commentInput.value.trim();

  if (!username || !text) return;

  const newComment = {
    username,
    text,
    time: new Date().toLocaleString(),
  };

  // Add to beginning of array (latest first)
  comments.unshift(newComment);

  // Save to localStorage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Re-render
  renderComments();

  // Reset form
  commentForm.reset();
});

// Handle delete
commentsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }
});

// Initial render
renderComments();


// Get modal
const modal = document.getElementById("logoModal");
const modalImg = document.getElementById("logoImg");
const logo = document.querySelector(".logo");
const span = document.querySelector(".close");

// Logo click করলে modal show হবে
logo.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
}

// Close button চাপলে modal বন্ধ হবে
span.onclick = function() {
  modal.style.display = "none";
}

// Overlay তে click করলে modal বন্ধ হবে
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}
