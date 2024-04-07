function verificarSesionYTipo() {
    const loggedIn = localStorage.getItem('currentEmail') !== null;
    if (!loggedIn) {
            Swal.fire({
                title: "Inicia sesion",
                icon: "warning",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/index.html"; 
                }
            });
            return;
    }


    const tipoUsuario = localStorage.getItem('currentRol');
    const esEstudiante = tipoUsuario === 'Estudiante';
    const esProfesional = tipoUsuario === 'Profesional';

    const body = document.querySelector('body');

    if (body.id === "userPage" && !esEstudiante) {
        Swal.fire({
            title: "No tienes permiso para esta pagina",
            icon: "warning",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/index.html"; 
            }
        });
        return;
    }

    if (body.id === "professionalPage" && !esProfesional) {
        Swal.fire({
            title: "No tienes permiso para esta pagina",
            icon: "warning",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/index.html"; 
            }
        });
        return;
    }
}



document.addEventListener("DOMContentLoaded", function() {

    verificarSesionYTipo();

    const logoutButton = document.getElementById("logoutButton");

    const isLoggedIn = localStorage.getItem('currentEmail') !== null;

    const isPageWithLogoutButton = document.body.classList.contains('logged-in');

    if (isLoggedIn && isPageWithLogoutButton) {
        logoutButton.classList.remove('d-none');
    } else {
        logoutButton.classList.add('d-none');
    }

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('currentEmail');
        localStorage.removeItem('currentID');
        localStorage.removeItem('currentName');
        window.location.href = "/index.html";
    });
});

window.addEventListener('load', function() {
    const userType = localStorage.getItem('currentRol');

    if (userType === 'Estudiante') {
        document.getElementById('botonProfesional-1').style.display = 'none';
        document.getElementById('botonProfesional-2').style.display = 'none';
    } else if (userType === 'Profesional') {
        document.getElementById('botonEstudiante-1').style.display = 'none';
        document.getElementById('botonEstudiante-2').style.display = 'none';
    }
});