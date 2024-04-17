document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Login-form");
  
    form.addEventListener("submit", validateLogin);
  });
  
  const validateLogin = async (event) => {
    event.preventDefault(); 
  
    const user= document.getElementById("correo").value;
    const pass = document.getElementById("contraseña").value; 
    const type = document.getElementById("tipo").value;
  
    console.log(user)
    console.log(pass)
  
    if (!user || !pass || !type) { 
      Swal.fire({
        title: 'Por favor, complete los datos para iniciar sesión',
        icon: 'warning'
      });
      return; 
    }


    if (type === 'Estudiante'){
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getAllById/${user}`);
        const userData = response.data[0];

        const id_usuario = userData.id_usuario;
        const correo = userData.email;
        const contraseña = userData.password;
        const name = userData.nombre;

        if (correo === user && pass === contraseña){

            localStorage.setItem('currentEmail', user);
            localStorage.setItem('currentID', id_usuario);
            localStorage.setItem('currentName', name);
            localStorage.setItem('currentRol', type)


            let timerInterval;
            Swal.fire({
            title: `¡Bienvenido, ${name}!`,
            timer: 1800,
            showConfirmButton: false,
            allowOutsideClick: false,
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href = "../user/Main_pag_user.html"
            }
            });
            }else{
                Swal.fire({
                    title: "Correo o contraseña incorrectos",
                    icon: 'warning'
                })
            }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "El correo no se encuentra registrado",
        icon: 'warning'
    })
    }
    } else if(type === 'Profesional'){
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getAllById_Pro/${user}`);
        const userData = response.data[0];

        const id_usuario = userData.id_profesional;
        const correo = userData.correo;
        const contraseña = userData.contraseña;
        const name = userData.nombre;

        if (correo === user && pass === contraseña){

            localStorage.setItem('currentEmail', user);
            localStorage.setItem('currentID', id_usuario);
            localStorage.setItem('currentName', name);
            localStorage.setItem('currentRol', type);


            let timerInterval;
            Swal.fire({
            title: `¡Bienvenido, ${name}!`,
            timer: 1600,
            showConfirmButton: false,
            allowOutsideClick: false,
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                  window.location.href = "../Profesional/citas.html";
            }
            });
            }else{
                Swal.fire({
                    title: "Correo o contraseña incorrectos",
                    icon: 'warning'
                })
            }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "El correo no se encuentra registrado",
        icon: 'warning'
    })
    }
    }else if(type === 'Administrador'){
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getAllById_admin/${user}`);
        const userData = response.data[0];

        const id_usuario = userData.id_admin;
        const correo = userData.correo;
        const contraseña = userData.contraseña;
        const name = userData.nombre;

        if (correo === user && pass === contraseña){

            localStorage.setItem('currentEmail', user);
            localStorage.setItem('currentID', id_usuario);
            localStorage.setItem('currentName', name);
            localStorage.setItem('currentRol', type);


            let timerInterval;
            Swal.fire({
            title: `¡Bienvenido, ${name}!`,
            timer: 1600,
            showConfirmButton: false,
            allowOutsideClick: false,
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href = "/admin/dashboardAdmin.html";
            }
            });
            }else{
                Swal.fire({
                    title: "Correo o contraseña incorrectos",
                    icon: 'warning'
                })
            }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "El correo no se encuentra registrado",
        icon: 'warning'
    })
    }

  }
  };
  