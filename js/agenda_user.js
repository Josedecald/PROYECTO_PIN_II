let correo;
let cita;

let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    pageLength: 8,
    destroy: true,
    language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
}

const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }

    await listEvents();

    dataTable = $("#datatable_event").DataTable(dataTableOptions);

    dataTableInitialized = true;
};

const listEvents = async () => {
    try {

        const correo_user = localStorage.getItem('currentEmail')
        const response = await fetch(`http://127.0.0.1:5000//getAllEventsUser/${correo_user}`);
        const events = await response.json();

        let content = '';
        events.forEach((event, index) => {
            const truncatedDetalles = event.detalles.length > 35 ? event.detalles.substring(0, 30) + '...' : event.detalles;

            content += `
            <tr>
                <td>${event.id}</td>
                <td>${event.titulo}</td>
                <td>${event.fecha}</td>
                <td>${event.hora}</td>
                <td>${truncatedDetalles}</td>
                <td class="text-center">
                    <button class="btn btn-sm border-primary btn-abrir-modalInfo" data-correo="${event.correo}" data-id="${event.id}" data-titulo="${event.titulo}" data-fecha="${event.fecha}" data-hora="${event.hora}" data-detalle="${event.detalles}"><i class="fa-solid fa-circle-info text-primary"></i></button>
                </td>
            </tr>`;
        });
        tableBody_event.innerHTML= content;

        const btnInfo = document.querySelectorAll(".btn-abrir-modalInfo")
        const btnCerrarinfo = document.querySelector("#btn-cerrar-info");
        const modalinfo = document.querySelector("#modalInfo")

        btnInfo.forEach(btn => {
            btn.addEventListener("click", () => {
                correo = btn.getAttribute('data-correo');
                cita = btn.getAttribute('data-id');
                titulo = btn.getAttribute('data-titulo');
                fecha = btn.getAttribute('data-fecha');
                hora = btn.getAttribute('data-hora');
                detalle = btn.getAttribute('data-detalle');

                document.getElementById('titulo_info').value = titulo;
                document.getElementById('correo_info').value = correo;
                document.getElementById('cita_info').value = cita;
                document.getElementById('fecha_info').value = fecha;
                document.getElementById('hora_info').value = hora;
                document.getElementById('detalles_info').value = detalle;
                modalinfo.showModal();
            });
        });

        btnCerrarinfo.addEventListener('click', ()=>{
            modalinfo.close()
        })

    } catch (error) {
        console.error(error);
    }
};

window.addEventListener("load", async()=>{
    await initDataTable();
});
