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
  
    if (!user || !pass || !type) { 
      Swal.fire({
        title: 'Por favor, complete los datos para iniciar sesión',
        icon: 'warning'
      });
      return; 
    }
  
    try {
        const response = await axios.get(`http://127.0.0.1:5000/getAllById/${user}`);
        const userData = response.data[0];
  
        const correo = userData.email;
        const contraseña = userData.password;
        const name = userData.nombre;

        if (correo === user && pass === contraseña){
            let timerInterval;
            Swal.fire({
            title: `¡Bienvenido, ${name}!`,
            timer: 2000,
            timerProgressBar: true,
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
  };
  