document.addEventListener('DOMContentLoaded', async function() {
  var calendarEl = document.getElementById('calendario');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    selectable: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    dateClick: async function(info) {
      const fecha = info.date.toISOString().split('T')[0];

      const eventsOfDay = eventsForCalendar.filter(event => event.start.includes(fecha));

      mostrarEventosEnModal(eventsOfDay);
    },

    eventDidMount: function(info) {
        var dayFrameEl = info.el.closest('.fc-daygrid-day-frame');
        if(dayFrameEl){
          dayFrameEl.style.backgroundColor = '#9DD7FF'; // Cambiar al color deseado
        }
        
    }
  });

  const response = await fetch("http://127.0.0.1:5000/getAllEvents");
  const eventsFromDB = await response.json();
  const eventsForCalendar = eventsFromDB.map(event => {
    let hora_inicio = event.hora_inicio;
    let hora_fin = event.hora_fin;
  
    if (hora_inicio && hora_inicio.length < 8) {
      hora_inicio = '0' + hora_inicio;
    }
  
    if (hora_fin && hora_fin.length < 8) {
      hora_fin = '0' + hora_fin;
    }
  
    return {
      title: event.titulo,
      start: `${event.fecha}T${hora_inicio}`,
      end: `${event.fecha}T${hora_fin}`,
    };
  });
  
  

  calendar.addEventSource(eventsForCalendar);

  calendar.render();

  const modal = document.getElementById('modalInfo');

  function mostrarEventosEnModal(eventsOfDay) {
    const modalContent = document.querySelector("#modalContent");
    modalContent.innerHTML = "";

    eventsOfDay.forEach(event => {
      console.log(event)

      const startTime = ("0" + event.start.split('T')[1].substring(0, 5)).slice(-5);

      console.log(startTime)

      const eventItem = document.createElement("div");
      eventItem.textContent = `${event.title} - ${startTime}`;
      modalContent.appendChild(eventItem);
    });

    modal.showModal();
  }

  const btnCerrarinfo = document.querySelector("#btn-cerrar-info");
  btnCerrarinfo.addEventListener("click", () => {
    modal.close();
  });
}); 
