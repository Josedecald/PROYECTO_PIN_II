

$(document).ready(  () =>{
  //DataTables
  $('#ContactTable').DataTable(
    {
      "language":{
        "url": "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json"
      }
    }
  );

  $('#UsersTable').DataTable(
    {
      "language":{
        "url": "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json"
      }
    }
  );
});

document.addEventListener('DOMContentLoaded', async () => {
  await getUserData();
  await view();
  await getDataAndUpdateGraphs();
});

const view = async () => {
  try {

    const response = await axios.get('/ruta hacia datos-almacenados');
    const respuestasGuardadas = response.data;

    if (Array.isArray(respuestasGuardadas)) {
      let respuestasTable = document.getElementById('respuestasTable');
      respuestasTable.innerHTML = '';


      respuestasGuardadas.forEach(respuesta => {
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
      console.error('Los datos no son un array de respuestas guardadas:', respuestasGuardadas);
    }
  } catch (error) {
    console.error('Error al obtener los datos almacenados:', error);
  }
}


const getUserData = async () => {
  try {

    const response = await axios.get('http://127.0.0.1:3000/getAll');
    const users = response.data;

    console.log(response.data)


    const userTableBody = document.getElementById('UserResponseTable');

    userTableBody.innerHTML = '';


    users.forEach(user => {
      const row = document.createElement('tr');
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
    console.error('Error al obtener los datos de usuario:', error);
  }
}


//Graficas
const dataInicioSesion = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [
    {
      label: 'Usuarios que iniciaron sesión',
      data: [45, 50, 60, 55, 70, 65, 60], 
      backgroundColor: [
        '#92C7CF',
        '#AC87C5',
        '#9BB8CD',
        '#AFC8AD',
        '#4F6F52',
        '#D7C0AE',
        '#CBB279'
      ],
      borderColor: [
        '#92C7CF',
        '#AC87C5',
        '#9BB8CD',
        '#AFC8AD',
        '#4F6F52',
        '#D7C0AE',
        '#CBB279'
      ],
      borderWidth: 1
    }
  ]
};

const configInicioSesion = {
  type: 'doughnut',
  data: dataInicioSesion,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Usuarios que iniciaron sesión en los últimos 7 días'
      }
    }
  },
};



const dataCitas = {
labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
datasets: [
  {
    label: 'Citas creadas',
    backgroundColor: [
      '#92C7CF',
      '#AC87C5',
      '#9BB8CD',
      '#AFC8AD',
      '#4F6F52',
      '#D7C0AE',
      '#CBB279'
    ],
    borderColor: [
      '#92C7CF',
      '#AC87C5',
      '#9BB8CD',
      '#AFC8AD',
      '#4F6F52',
      '#D7C0AE',
      '#CBB279'
    ],
    borderWidth: 1
  }
]
};

const configCitas = {
type: 'doughnut',
data: dataCitas,
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Citas creadas en los últimos 7 días'
    }
  }
},
};

const getDataAndUpdateGraphs = async () => {
  try {
      const resInicioSesion = await axios.get('/dataInicioSesion');
      const dataInicioSesion = resInicioSesion.data;
      configInicioSesion.data = dataInicioSesion;

      const resCitas = await axios.get('/dataCitas');
      const dataCitas = resCitas.data;

      const graphInicioSesion = new Chart(document.querySelector("#graph-InicioSesion"), configInicioSesion);
      const graphCitas = new Chart(document.querySelector("#graph-citas"), configCitas);
  } catch (error) {
      console.error('Error al obtener los datos de las graficas:', error);
  }
};

getDataAndUpdateGraphs();


