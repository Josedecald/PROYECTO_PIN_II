document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("publicarForm").addEventListener("submit", post);
  uploadPosts();
});

const post = async (event) => {
  event.preventDefault();

  const postText = document.getElementById("textoPublicacion").value.trim();
  if (postText === "") {
      Swal.fire({
          title: "Debes escribir algo",
          icon: 'warning'
      });
      return;
  }

  const data = {
      contenido: postText,
      id_usuario: localStorage.getItem('currentID')
  };

  try {
      const response = await fetch('http://127.0.0.1:5000/guardar_publi', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          uploadPosts();
          document.getElementById("textoPublicacion").value = "";
      } else {
          throw new Error('Error al guardar la publicación');
      }
  } catch (error) {
      console.error(error);
  }
};

const uploadPosts = async () => {
  try {
      const response = await axios.get(`http://127.0.0.1:5000/getAllPubli`);
      const posts = response.data;
      displayPosts(posts);
  } catch (error) {
      console.error(error);
  }
};

const displayPosts = (posts) => {
  const postsContainer = document.getElementById("post");
  postsContainer.innerHTML = "";

  if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.style.display = "none";
      return;
  }

  postsContainer.style.display = "block";

  posts.sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora));

  posts.forEach((currentPost) => {
      const postCard = document.createElement("div");
      postCard.className = "card border rounded-3 mt-3";
      postCard.innerHTML = `
          <div class="card-body">
              <p>${currentPost.nombre}</p>
              <p class="card-text">${currentPost.contenido}</p>
              <p class="card-text"><small class="text-muted">${currentPost.fecha_hora}</small></p>
              <button class="btn btn-outline-secondary" onclick="showResponseForm(${currentPost.id_publi})"><i class="fa-regular fa-comment"></i></button>
              <div id="responses-${currentPost.id_publi}"></div>
              <form id="responseForm-${currentPost.id_publi}" style="display: none;">
                  <div class="form-group mt-2">
                      <textarea class="form-control" id="responseText-${currentPost.id_publi}" placeholder="Escribe tu respuesta..." rows="1"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary mt-2" onclick="postResponse(event, ${currentPost.id_publi})">Enviar respuesta</button>
              </form>
          </div>
      `;
      postsContainer.appendChild(postCard);
  });
};

const showResponseForm = async (postId) => {
  await uploadComments(postId);

  document.getElementById(`responseForm-${postId}`).style.display = "block";

  
};

const postResponse = async (event, postId) => {
  event.preventDefault();

  const responseText = document.getElementById(`responseText-${postId}`).value.trim();

  if (responseText === "") {
      Swal.fire("Debes escribir algo");
      return;
  }

  const data = {
      contenido: responseText,
      id_publi: postId,
      id_usuario: localStorage.getItem('currentID')
  };

  try {
      const response = await fetch('http://127.0.0.1:5000/guardar_comen', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          document.getElementById(`responseText-${postId}`).value = "";
          document.getElementById(`responseForm-${postId}`).style.display = "none";
  
          uploadComments(postId);
      } else {
          throw new Error('Error al guardar el comentario');
      }
  } catch (error) {
      console.error(error);
  }
};

const uploadComments = async (postId) => {
  try {
      const response = await axios.get(`http://127.0.0.1:5000/getAllComen/${postId}`);
      const comments = response.data;
      displayComments(postId, comments);
  } catch (error) {
      console.error(error);
  }
};

const displayComments = (postId, comments) => {
  const commentContainer = document.getElementById(`responses-${postId}`);
  commentContainer.innerHTML = "";

  if (!Array.isArray(comments) || comments.length === 0) {
      commentContainer.style.display = "none";
      return;
  }

  commentContainer.style.display = "block";

  comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "card border rounded mt-3 p-2 bg-light";
      commentElement.innerHTML = `
          <p class="m-2">${comment.nombre}</p>
          <p class="card-text m-3">${comment.contenido}</p>
          <p class="card-text mx-2"><small class="text-muted">${comment.fecha_hora}</small></p>`;
      commentContainer.appendChild(commentElement);
  });
};
