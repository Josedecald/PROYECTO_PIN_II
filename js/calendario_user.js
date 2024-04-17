document.addEventListener('DOMContentLoaded', async function() {
    var today = new Date();
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        selectConstraint: {
            daysOfWeek: [1, 2, 3, 4, 5, 6]
        },
        selectable: true,
        validRange: {
            start: today,
        },
        select: async function(info) {
            const fecha = info.startStr;
            const id_profesional = document.getElementById('id_pro').value;
            console.log(id_profesional)

            try {
                const response = await fetch(`http://127.0.0.1:5000/getAvailableTimes/${fecha}/${id_profesional}`);
                const data = await response.json();

                mostrarHorariosDisponibles(data.horarios, info);
            } catch (error) {
                console.error('Error al obtener los horarios disponibles:', error);
            }
        },
    });

    calendar.render();

    document.getElementById('id_pro').addEventListener('change', async function() {
        const id_profesional = this.value;
    
        calendar.getEvents().forEach(event => event.remove());
    
        document.querySelectorAll('.fc-daygrid-day-frame').forEach(dayFrameEl => {
            dayFrameEl.style.backgroundColor = '';
        });
    
        if (id_profesional > 0) {
            const dates = getAllDatesInCurrentMonth();
    
            const promises = dates.map(date => fetch(`http://127.0.0.1:5000/getAvailableTimes/${date}/${id_profesional}`));
    
            try {
                const responses = await Promise.all(promises);
    
                responses.forEach(async (response, index) => {
                    const data = await response.json();
                    if (data.horarios.length === 0) {
                        var dayFrameEl = document.querySelector(`.fc-day[data-date="${dates[index]}"] .fc-daygrid-day-frame`);
                        if (dayFrameEl) {
                            dayFrameEl.style.backgroundColor = '#fb6161';
                        }
                    }
                });
    
                const responseEvents = await fetch(`http://127.0.0.1:5000/getAllEventsPro/${id_profesional}`);
                const dataEvents = await responseEvents.json();
                if (Array.isArray(dataEvents) && dataEvents.length > 0) {
                    const events = dataEvents.map(event => {
                        return {
                            title: event.titulo,
                            start: `${event.fecha}T${event.hora_inicio}`,
                            end: `${event.fecha}T${event.hora_fin}`,
                        };
                    });
                    calendar.addEventSource(events);
                } else {
                    console.error('La respuesta del servidor no contiene eventos o está vacía.');
                }
            } catch (error) {
                console.error('Error al obtener los horarios y eventos:', error);
            }
        } else {
            console.error('El valor del profesional seleccionado es 0 o menor.');
        }
    });

    function getAllDatesInCurrentMonth() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
    
        const dates = [];
        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            dates.push(day.toISOString().split('T')[0]);
        }
    
        return dates;
    }
    
    function mostrarHorariosDisponibles(horarios, info) {
        const modal = new bootstrap.Modal(document.getElementById('modalHorarios'));
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = '';

        horarios.forEach(horario => {
            const horarioElement = document.createElement('div');
            horarioElement.classList.add('border', 'rounded', 'p-3', 'mb-2');
            
            horarioElement.textContent = horario;

            const reservarButton = document.createElement('button');
            reservarButton.classList.add('btn', 'btn-primary', 'mx-2');
            reservarButton.textContent = 'Reservar cita';

            reservarButton.addEventListener('click', async () => {
                try {
                    const citaData = {
                        titulo: `Cita Programada por ${localStorage.getItem('currentName')}`,
                        fecha: info.startStr,
                        hora_inicio: horario,
                        duracion: 30,
                        detalles: 'Esta cita fue programada por el usuario',
                        correo: localStorage.getItem('currentEmail'),
                        id_profesional: document.getElementById('id_pro').value
                    };
            
                    const response = await axios.post("http://127.0.0.1:5000/registrar_citas", citaData);
            
                    Swal.fire({
                        title: "Cita guardada exitosamente",
                        icon: "success",
                    });
            
                } catch (error) {
                    if (error.response.status === 400) {
                        Swal.fire({
                            title: "Error al guardar la cita",
                            text: error.response.data.informacion,
                            icon: 'error',
                            target: document.getElementById('modal')
                        });
                    } else {
                        Swal.fire({
                            title: "Error al guardar la cita",
                            text: "Ocurrió un error inesperado",
                            icon: 'error',
                            target: document.getElementById('modal')
                        });
                }}
            });

            horarioElement.appendChild(reservarButton);

            modalBody.appendChild(horarioElement);
        });

        modal.show();
    }
});
