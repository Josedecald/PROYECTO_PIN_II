$(document).ready(() => {
  //DataTables
  $("#ContactTable").DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
  });

  $("#UsersTable").DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
  });
});

document.addEventListener("DOMContentLoaded",  () => {
  getUserData();
  view();
  ConfigsGraphs();
});

const view = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/getAllContact");
    const respuestasGuardadas = response.data;

    if (Array.isArray(respuestasGuardadas)) {
      let respuestasTable = document.getElementById("respuestasTable");
      respuestasTable.innerHTML = "";

      respuestasGuardadas.forEach((respuesta) => {
        respuestasTable.innerHTML += `
          <tr>
            <td>${respuesta.nombre}</td>
            <td>${respuesta.email}</td>
            <td>${respuesta.asunto}</td>
            <td>${respuesta.mensaje}</td>
          </tr>
        `;
      });
    } else {
      console.error(
        "Los datos no son un array de respuestas guardadas:",
        respuestasGuardadas
      );
    }
  } catch (error) {
    console.error("Error al obtener los datos almacenados:", error);
  }
};

const getUserData = async () => {
  try {

    const response = await axios.get('http://127.0.0.1:5000/getAll');
    const users = response.data;

    console.log(response.data)

    const userTableBody = document.getElementById("UserResponseTable");


    userTableBody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.edad}</td>
        <td>${user.genero}</td>
        <td>${user.carrera}</td>
      `;
      userTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener los datos de usuario:", error);
  }
};

//Graficas

const ConfigsGraphs = () => {
  axios.get("../JSON/datos.json").then((response) => {
    const datosSemanales = response.data;

    const dataInicioSesion = {
      labels: Object.keys(datosSemanales),
      datasets: [
        {
          label: 'Usuarios que iniciaron sesión',
          data: Object.values(datosSemanales).map(dia => dia.usuarios), 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(191, 216, 175, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(191, 216, 175, 1)'
          ],
          borderWidth: 1,
          fill: false
        }
      ]
    };

    const configInicioSesion = {
      type: "doughnut",
      data: dataInicioSesion,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: false,
            text: "Usuarios que iniciaron sesión en los últimos 7 días",
          },
        },
      },
    };

    const dataPublicaciones = {
      labels:Object.keys(datosSemanales),
      datasets: [
        {
          label: "Publicaciones realizadas",
          data: Object.values(datosSemanales).map(dia => dia.publicaciones),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(191, 216, 175, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(191, 216, 175, 1)'
          ],
          borderWidth: 1,
          fill: false
        },
      ],
    };

    const configPublicaciones = {
      type: "bar",
      data: dataPublicaciones,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "Publicaciones realizadas en los últimos 7 días",
          },
        },
      },
    };

    const dataCitas = {
      labels:Object.keys(datosSemanales),
      datasets: [
        {
          label: "Citas creadas",
          data: Object.values(datosSemanales).map(dia => dia.citas),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(191, 216, 175, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(191, 216, 175, 1)'
          ],
          borderWidth: 1,
          fill: false
        },
      ],
    };

    const configCitas = {
      type: "doughnut",
      data: dataCitas,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: false,
            text: "Citas creadas en los últimos 7 días",
          },
        },
      },
    };

    const graphInicioSesion = new Chart(
      document.querySelector("#graph-InicioSesion"),
      configInicioSesion
    );
    const graphPublicaciones = new Chart(
      document.querySelector("#graph-publicaciones"),
      configPublicaciones
    );
    const graphCitas = new Chart(
      document.querySelector("#graph-citas"),
      configCitas
    );
  });
};

