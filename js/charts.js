
const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Usuarios que iniciaron sesión',
        data: [45, 50, 60, 55, 70, 65, 60], // Datos inventados para ilustrar el ejemplo
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
  
  const config = {
      type: 'doughnut',
      data: data,
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
  
  const chart = new Chart(document.querySelector("#graph-1"), config);