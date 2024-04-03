let correo;
let cita;

let dataTable;
let dataTableInitialized = false;

const dataTableOptions ={
    pageLength: 8,
    destroy: true,
    language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
      },
}

const initDatable = async()=>{
    if (dataTableInitialized == true){
        dataTable.destroy();
    }

    await listEvents();

    dataTable = $("#datatable_event").DataTable(dataTableOptions);

    dataTableInitialized = true
};


const listEvents = async()=>{
    try{
        const response = await fetch("http://127.0.0.1:5000/getAllEvents");
        const events = await response.json();
        
        let content = '';
        events.forEach((event, index) => {
            content += `
            <tr>
                <td>${index+1}</td>
                <td>${event.id}</td>
                <td>${event.correo}</td>
                <td>${event.titulo}</td>
                <td>${event.fecha}</td>
                <td>${event.hora}</td>
                <td>${event.detalles}</td>
                <td>
                <button class="btn btn-sm btn-primary btn-abrir-modalEdit" data-correo="${event.correo}" data-id="${event.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-sm btn-danger btn-eliminar-cita" data-id="${event.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        });
        tableBody_event.innerHTML= content;

        const btnsAbrirModal = document.querySelectorAll(".btn-abrir-modalEdit");
        const btnCerrarModal = document.querySelector("#btn-cerrar-modalEdit");
        const modal = document.querySelector("#modalEdit");
        
        btnsAbrirModal.forEach(btn => {
            btn.addEventListener("click", () => {
                correo = btn.getAttribute('data-correo');
                cita = btn.getAttribute('data-id');
                document.getElementById('correo').value = correo;
                document.getElementById('cita').value = cita;
                modal.showModal();
            });
        });
        
        btnCerrarModal.addEventListener("click", () => {
            modal.close();
        });

        const btnsEliminarCita = document.querySelectorAll(".btn-eliminar-cita");

        btnsEliminarCita.forEach(async btn => {
            btn.addEventListener("click", async () => {
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
                        cancelButtonText: "No, cancelar",
                        confirmButtonText: "Si, eliminar",
                    });
        
                    if (result.isConfirmed) {
                        const citaId = btn.getAttribute('data-id');
                        const response = await axios.delete(`http://127.0.0.1:5000/deleteEvent/${citaId}`);
                        console.log(response);
        
                        Swal.fire({
                            title: "Cita eliminada exitosamente",
                            icon: "success",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const modal = document.querySelector("#modalEdit");
                                modal.close();
                            }
                        });
        
                        await initDatable();                            
                    }
                } catch (error) {
                    console.error("Error al enviar la solicitud:", error);
                    Swal.fire({
                        title: "Error al eliminar la cita",
                        text: error.message,
                        icon: 'error',
                        target: document.getElementById('modalEdit')
                    });
                }
            });
        });

    } catch(e){
        alert(e)
    }
}

window.addEventListener("load", async()=>{
    await initDatable();
});

const btnActualizarCita = document.querySelector("#btn-actualizar-edit");
btnActualizarCita.addEventListener("click", async () => {
    const titulo = document.getElementById('titulo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const detalles = document.getElementById('detalles').value;

    if (titulo === "" || fecha === "" || hora === "") {
        Swal.fire({
            title: "Complete todos los campos",
            icon: "warning",
            target: document.getElementById('modalEdit')
        });
        return;
    }
    try {
        const citaData = {
            titulo: titulo,
            fecha: fecha,
            hora: hora,
            detalles: detalles,
            correo: correo,
            cita: cita
        };

        const response = await axios.put(`http://127.0.0.1:5000/updateEvent/${cita}`, citaData);
        console.log(response)

        Swal.fire({
            title: "Cita actualizada exitosamente",
            icon: "success",
            target: document.getElementById('modalEdit')
        }).then((result) => {
            if (result.isConfirmed) {
                const modal = document.querySelector("#modalEdit");
                modal.close();
            }
        });
        
        await initDatable();

    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        Swal.fire({
            title: "Error al actualizar la cita",
            text: error.message,
            icon: 'error',
            target: document.getElementById('modalEdit')
        });
    }
});
