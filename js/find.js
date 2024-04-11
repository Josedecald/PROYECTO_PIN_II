


document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const correo = document.getElementById('correo-input').value;
    
    if (correo === ""){
        Swal.fire({
            title: "Ingrese un correo",
            icon: 'warning',
        });
        return;
    }

    try {
        const response = await axios.get(`http://127.0.0.1:5000/getAllById/${correo}`);
        const userData = response.data[0];
        document.getElementById('nombre').value = userData.nombre;
        document.getElementById('nombre2').value = userData.nombre;
        document.getElementById('email').value = userData.email;
        document.getElementById('edad').value = userData.edad;

        if (userData.genero === "M"){
            document.getElementById('genero').value = "Masculino";
        }else if (userData.genero === "F"){
            document.getElementById('genero').value = "Femenino";
        }else if (userData.genero === "O"){
            document.getElementById('genero').value = "Otro";
        }
        document.getElementById('carrera').value = userData.carrera;
    } catch (error) {
        Swal.fire({
            title: "El usuario no existe.",
            icon: 'warning',
        });
    }
    
    
});

const btnAbrirModal = document.querySelector("#btn-abrir-modal")
const btnCerrarModal = document.querySelector("#btn-cerrar-modal")
const modal = document.querySelector("#modal")

btnAbrirModal.addEventListener("click",()=>{
    const correo = document.getElementById('correo-input').value;
    if (correo === ""){
        Swal.fire({
            title: "Ingrese un correo",
            icon: 'warning',
        });
        return;
    }
    modal.showModal();
})

btnCerrarModal.addEventListener("click",()=>{
    modal.close();
})



const btnGuardarCita = document.querySelector("#btn-guardar-cita");
btnGuardarCita.addEventListener("click", async () => {
    const correo = document.getElementById('correo-input').value;
    const titulo = document.getElementById('titulo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const detalles = document.getElementById('detalles').value;

    if ( titulo === "" || fecha === "" || hora === "") {
        Swal.fire({
            title: "Complete todos los campos",
            icon: 'warning',
            target: document.getElementById('modal')
        });
        return;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedHour = parseInt(hora.split(':')[0], 10);
    const selectedMinute = parseInt(hora.split(':')[1], 10);

    console.log(currentHour, selectedHour)

    if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute <= currentMinute)) {
        Swal.fire({
            title: "La hora seleccionada debe ser posterior a la hora actual",
            icon: 'warning',
            target: document.getElementById('modal')
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
            id_profesional: localStorage.getItem('currentID')
        };

        const response = await axios.post("http://127.0.0.1:5000/registrar_citas", citaData);
        const his = await axios.post("http://127.0.0.1:5000/registro", citaData);


        Swal.fire({
            title: "Cita guardada exitosamente",
            icon: "success",
        });

        const modal = document.querySelector("#modal");
        modal.close();

        document.getElementById('correo-input').value = "";
        document.getElementById('titulo').value = "";
        document.getElementById('fecha').value = "";
        document.getElementById('hora').value = "";
        document.getElementById('detalles').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('nombre2').value = "";
        document.getElementById('email').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('carrera').value = "";
        document.getElementById('genero').value = "";

    } catch (error) {
        Swal.fire({
            title: "Error al guardar la cita",
            text: error.message,
            icon: 'error',
            target: document.getElementById('modal')
        });
    }
});

