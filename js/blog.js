// Sample blog posts data (you can fetch this from a JSON file or API in a real application)
const blogPosts = [
    {
      title: "7.27.23 - 4:30pm - Aliens",
      content: "This is the content of blog post 1."
    },
    {
      title: "Blog Post 2",
      content: "This is the content of blog post 2."
    },
    // Add more blog posts as needed
  ];
  
  // Function to create and display blog posts
  function displayBlogPosts() {
    const blogContainer = document.getElementById("/blog.html");
  
    // Loop through the blogPosts array and create HTML elements for each post
    blogPosts.forEach(post => {
      const postElement = document.createElement("content");
      postElement.classList.add("post");
  
      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title;
  
      const contentElement = document.createElement("p");
      contentElement.textContent = post.content;
  
      postElement.appendChild(titleElement);
      postElement.appendChild(contentElement);
  
      blogContainer.appendChild(postElement);
    });
  }
  
  // Call the function to display blog posts when the page loads
  document.addEventListener("DOMContentLoaded", displayBlogPosts);
  
  consolelog(displayBlogPosts)