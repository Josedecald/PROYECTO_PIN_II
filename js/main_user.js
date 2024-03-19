const typed = new Typed("#typed", {
  strings: [
    localStorage.getItem("typedText1"),
    localStorage.getItem("typedText2"),
    localStorage.getItem("typedText3"),
  ],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 7000,
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
    publicationTime: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Opcional, si deseas usar el formato de 12 horas
    }),
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

    posts.forEach((currentPost, index) => { 
      const postCard = document.createElement("div");
      postCard.className = "card border rounded mt-3";

      postCard.innerHTML = `
      <div class="card-body">
      <p>Nombre usuario</p>
      <p class="card-text">${currentPost.text}</p>
      <p class="card-text"><small class="text-muted">${currentPost.publicationTime}</small></p>
      <button class="btn btn-outline-secondary" onclick="showResponseForm(${index})"><i class="fa-regular fa-comment"></i></button>
      <div id="responses-${index}"></div>
      <form id="responseForm-${index}" style="display: none;">
        <div class="form-group mt-2">
          <textarea class="form-control" id="responseText-${index}" placeholder="Escribe tu respuesta..." rows="1"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-2" onclick="postResponse(event, ${index})">Enviar respuesta</button>
      </form>
    </div>
      `;

      postsContainer.appendChild(postCard);

      if (currentPost.responses) {
        currentPost.responses.forEach(response => {
          const responseElement = document.createElement("div");
          responseElement.className = "card border rounded mt-3 bg-light";
          responseElement.innerHTML = `
          <p class="m-2">Nombre usuario </p>
          <p class="card-text m-3">${response.text}</p>
          <p class="card-text mx-2"><small class="text-muted">${response.publicationTime}</small></p>`;
          
          document.getElementById(`responses-${index}`).appendChild(responseElement);
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

