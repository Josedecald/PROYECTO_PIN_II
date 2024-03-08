const typed = new Typed("#typed", {
  strings: [
    localStorage.getItem("typedText1"),
    localStorage.getItem("typedText2"),
    localStorage.getItem("typedText3"),
  ],
  typeSpeed: 80,
  backSpeed: 60,
  loop: true,
});

const post = (event) => {
  event.preventDefault();

  const postText = document.getElementById("textoPublicacion").value.trim();
  if (postText === "") {
    alert("Debes escribir algo");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  const newPost = {
    text: postText,
    publicationTime: new Date().toLocaleString(),
    responses: [],
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  uploadPosts();

  document.getElementById("textoPublicacion").value = "";
};

const uploadPosts = () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postsContainer = document.getElementById("post");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.style.display = "none";
  } else {
    postsContainer.style.display = "block";

    posts.forEach(post => {
      const postCard = document.createElement("div");
      postCard.className = "card border rounded mt-3";

      postCard.innerHTML = `
      <div class="card-body">
      <p class="card-text">${post.text}</p>
      <p class="card-text"><small class="text-muted">${post.publicationTime}</small></p>
      <button class="btn btn-outline-secondary" onclick="showResponseForm(${posts.indexOf(post)})"><i class="fa-regular fa-comment"></i></button>
      <div id="responses-${posts.indexOf(post)}"></div>
      <form id="responseForm-${posts.indexOf(post)}" style="display: none;">
        <div class="form-group mt-2">
          <textarea class="form-control" id="responseText-${posts.indexOf(post)}" placeholder="Escribe tu respuesta..." rows="1"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-2" onclick="postResponse(event, ${posts.indexOf(post)})">Enviar respuesta</button>
      </form>
    </div>
      `;

      postsContainer.appendChild(postCard);

      if (post.responses) {
        post.responses.forEach(response => {
          const responseElement = document.createElement("div");
          responseElement.className = "card border rounded mt-3";
          responseElement.innerHTML = `
          <p class="card-text">${response.text}</p>
          <p class="card-text"><small class="text-muted">${response.publicationTime}</small></p>`;
          
          document.getElementById(`responses-${posts.indexOf(post)}`).appendChild(responseElement);
        });
      }
    });
  }
};

const showResponseForm = (index) =>{
  document.getElementById(`responseForm-${index}`).style.display = "block";
};

const postResponse = (event, index) =>{
  event.preventDefault();

  const responseText = document.getElementById(`responseText-${index}`).value.trim();

  if (responseText === ''){
    alert("Debes escribir algo");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!posts[index].responses) {
    posts[index].responses = [];
  }

  const newResponse = {
    text: responseText,
    publicationTime: new Date().toLocaleString(),
  }
  posts[index].responses.push(newResponse);
  localStorage.setItem("posts", JSON.stringify(posts));

  uploadPosts();
  
  document.getElementById(`responseText-${index}`).value = "";
  document.getElementById(`responseForm-${index}`).style.display = "none";

};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("publicarForm").addEventListener("submit", post);
  uploadPosts();
});
