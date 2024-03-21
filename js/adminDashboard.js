let view = () => {
    let respuestasGuardadas = JSON.parse(localStorage.getItem('respuestas')) || [];


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
}
document.addEventListener('DOMContentLoaded', () => view());


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
  
  

  // Datos inventados para la cantidad de publicaciones hechas en la semana
const dataPublicaciones = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [
    {
      label: 'Publicaciones realizadas',
      data: [50, 35, 30, 55, 40, 25, 10], // Datos inventados para ilustrar el ejemplo
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

const configPublicaciones = {
  type: 'bar',
  data: dataPublicaciones,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Publicaciones realizadas en los últimos 7 días'
      }
    }
  },
};



// Datos inventados para la cantidad de citas creadas en la semana
const dataCitas = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [
    {
      label: 'Citas creadas',
      data: [10, 15, 20, 25, 30, 35, 40], // Datos inventados para ilustrar el ejemplo
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

const chart = new Chart(document.querySelector("#graph-InicioSesion"), configInicioSesion);
const chartPublicaciones = new Chart(document.querySelector("#graph-publicaciones"), configPublicaciones);
const chartCitas = new Chart(document.querySelector("#graph-citas"), configCitas);


  let contenidoVisible = true
  document.getElementById('viewContent').addEventListener('click', () =>{
    const content = document.getElementById('Info');
    if (contenidoVisible) {
      content.style.display = "block";
      contenidoVisible = false;
    } else {
      content.style.display = "none";
      contenidoVisible = true;
    }
  });