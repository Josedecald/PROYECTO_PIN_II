
const currentPage = document.body.id;

const post = async (event) => {
  event.preventDefault();

  console.log(String(localStorage.getItem('currentID')))

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
    id_usuario: String(localStorage.getItem('currentID'))

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

  posts.forEach((currentPost, index) => {
    const postCard = document.createElement("div");
    postCard.className = "card border rounded-3 mt-3";
    postCard.id = `postCard-${currentPost.id_publi}`; 

    postCard.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center my-3">
        <p>${localStorage.getItem('currentName')}</p>
        <div class="align-content-end ms-auto">
          <button id="eliminarPubli" class="btn eliminarPubli" data-post-id="${currentPost.id_publi}" type="button"><i class="equis fa-solid fa-x"></i></button>
        </div>
      </div>
        <p class="card-text">${currentPost.contenido}</p>
        <p class="card-text"><small class="text-muted">${currentPost.fecha_hora}</small></p>
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

    const eliminarPubliIcons = document.querySelectorAll("#eliminarPubli");

    eliminarPubliIcons.forEach((btn) => {
      btn.addEventListener("click", async ()=>{
      console.log("Hola")
      try {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-danger mx-5",
              cancelButton: "btn btn-secondary mx-5"
            },
            buttonsStyling: false
          });
        
        const result = await swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "No podras revertirlo luego",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No, Cancelar",
            confirmButtonText: "Si, Eliminar",
        });
        if (result.isConfirmed){
          const postId = btn.getAttribute('data-post-id');
          const response = axios.delete(`http://127.0.0.1:5000/deletePubli/${postId}`);
          console.log(response);

          const postCard = document.getElementById(`postCard-${postId}`);
          postCard.parentNode.removeChild(postCard);

          Swal.fire({
            title: "Publicación eliminada",
            icon: "success",
          });
      };
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        Swal.fire({
          title: "Error al eliminar la publicación",
          text: error.message,
          icon: 'error',
              });
          }
      });
    });

    if (currentPost.responses && Array.isArray(currentPost.responses)) {
      currentPost.responses.forEach((response) => {
        const responseElement = document.createElement("div");
        responseElement.className = "card border rounded mt-3 p-2 bg-light";
        responseElement.innerHTML = `
          <p class="m-2">Nombre usuario </p>
          <p class="card-text m-3">${response.text}</p>
          <p class="card-text mx-2"><small class="text-muted">${response.publicationTime}</small></p>`;
        document.getElementById(`responses-${index}`).appendChild(responseElement);
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("publicarForm").addEventListener("submit", post);
  uploadPosts();
});

const showResponseForm = (index) => {
  document.getElementById(`responseForm-${index}`).style.display = "block";
};

const postResponse = async (event, index) => {
  event.preventDefault();

  const responseText = document
    .getElementById(`responseText-${index}`)
    .value.trim();

  if (responseText === "") {
    Swal.fire("Debes escribir algo");
    return;
  }

  
  document.getElementById(`responseText-${index}`).value = "";
  document.getElementById(`responseForm-${index}`).style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("publicarForm").addEventListener("submit", post);
  uploadPosts();
  });

