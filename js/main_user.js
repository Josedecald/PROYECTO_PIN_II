

const typed = new Typed("#typed", {
  strings: [
    'HOLI',
  ],
  typeSpeed: 80,
  backSpeed: 60,
  loop: true,
});

// Función para cargar los posts desde el backend y mostrarlos en la interfaz de usuario
const uploadPosts = async () => {
  console.log('Uploading posts...');
  try {
    const response = await axios.get('http://127.0.0.1:4000/get_posts');
    const posts = response.data; // Accede a la propiedad data de la respuesta
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
            <p class="card-text">${currentPost.text}</p>
            <p class="card-text"><small class="text-muted">${currentPost.publicationTime}</small></p>
            <button class="btn btn-outline-secondary" onclick="showResponseForm('${currentPost.id}')"><i class="fa-regular fa-comment"></i></button>
            <div id="responses-${currentPost.id}"></div>
            <form id="responseForm-${currentPost.id}" style="display: none;">
              <div class="form-group mt-2">
                <textarea class="form-control" id="responseText-${currentPost.id}" placeholder="Escribe tu respuesta..." rows="1"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2" onclick="postResponse(event, '${currentPost.id}')">Enviar respuesta</button>
            </form>
          </div>
        `;
        postsContainer.appendChild(postCard);
        if (currentPost.responses) {
          currentPost.responses.forEach(response => {
            const responseElement = document.createElement("div");
            responseElement.className = "card border rounded mt-3 bg-light";
            responseElement.innerHTML = `
              <p class="card-text">${response.text}</p>
              <p class="card-text"><small class="text-muted">${response.publicationTime}</small></p>
            `;
            document.getElementById(`responses-${index}`).appendChild(responseElement);
          });
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('Hubo un error al cargar los posts');
  }
};

// Función para enviar un nuevo post al backend
const post = async (event) => {
  event.preventDefault();
  const postText = document.getElementById("textoPublicacion").value.trim();
  if (postText === "") {
    alert("Debes escribir algo");
    return;
  }
  const publicationTime = new Date().toLocaleString();
  try {
    await axios.post('http://127.0.0.1:4000/create_post', 
    { 
      text: postText,
      publicationTime

      });
    await uploadPosts(); // Actualizar la interfaz del usuario después de guardar el post
    document.getElementById("textoPublicacion").value = "";
  } catch (error) {
    console.error('Error:', error.message);
    alert('Hubo un error al intentar publicar el post');
  }
};

// Función para mostrar el formulario de respuesta
const showResponseForm = (postId) => {
  document.getElementById(`responseForm-${postId}`).style.display = "block";
};

// Función para enviar una respuesta al backend
const postResponse = async (event, postId) => {
  event.preventDefault();
  const responseText = document.getElementById(`responseText-${postId}`).value.trim();
  if (responseText === '') {
    alert("Debes escribir algo");
    return;
  }
  try {
    await axios.post(`http://127.0.0.1:4000/create_response/${postId}/responses`, { text: responseText });
    await uploadPosts(); // Actualizar la interfaz del usuario después de enviar la respuesta
    document.getElementById(`responseText-${postId}`).value = ""; // Corrección aquí
    document.getElementById(`responseForm-${postId}`).style.display = "none"; // Corrección aquí
  } catch (error) {
    console.error('Error:', error.message);
    alert('Hubo un error al intentar enviar la respuesta');
  }
};


// Función para cargar los posts al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("publicarForm").addEventListener("submit", post);
  uploadPosts();
});
