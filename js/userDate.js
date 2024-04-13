document.addEventListener('DOMContentLoaded', function() {

    
    let today = new Date();
    
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');

    let formattedDate = year + '-' + month + '-' + day;

    console.log(formattedDate)


    document.getElementById('fecha').setAttribute('min', formattedDate);
});


document.getElementById('abrirDispo').addEventListener('click', async function() {
    const fechaSeleccionada = document.getElementById('fecha').value;

    if (fechaSeleccionada === ""){
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese una fecha',
        });
        return;
    }
    
    try {
        const response = await axios.get(`http://127.0.0.1:5000/getAvailableTimes/${fechaSeleccionada}`);
        const horariosDisponibles = response.data.horarios;

        const modal = document.getElementById('modalDispo');
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = '';

        horariosDisponibles.forEach(horario => {

            const divContenedor = document.createElement('div');
            divContenedor.classList.add('horario-disponible');

            const inputHora = document.createElement('input');
            inputHora.setAttribute('type', 'time');
            inputHora.setAttribute('value', horario);
            inputHora.setAttribute('readonly', 'true');
            inputHora.classList.add('form-control', 'mt-3', 'text-break');
            modalBody.appendChild(inputHora);

            const btnAgendar = document.createElement('button');
            btnAgendar.textContent = 'Agendar';
            btnAgendar.classList.add('btn', 'btn-primary', 'mt-2');
            btnAgendar.addEventListener('click', () => {
                console.log('Horario seleccionado:', horario);
            });
            divContenedor.appendChild(btnAgendar);

            modalBody.appendChild(divContenedor);
        });

        modal.showModal();
    } catch (error) {
        console.error('Error al obtener los horarios disponibles:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la disponibilidad. Por favor, inténtalo de nuevo más tarde.',
        });
    }
});


const modal = document.getElementById('modalDispo');
document.getElementById('btn-cerrar-modal').addEventListener('click', () =>{
    modal.close();
});
