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
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        });
        tableBody_event.innerHTML= content;
    }catch(e){
        alert(e)
    }
}

window.addEventListener("load", async()=>{
    await initDatable();
});