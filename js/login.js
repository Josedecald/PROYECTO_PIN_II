
const validateLogin = (event) => {
    event.preventDefault(); 
    let savedUsers  = JSON.parse(localStorage.getItem('USERS')) || [];


    const user= document.getElementById("usr").value.trim();
    const pass = document.getElementById("pass").value.trim(); 
    const type = document.getElementById("Type").value.trim();
  
    if (!user || !pass || !type) { 
      swal({
        title: 'Por favor, complete los datos para iniciar sesión',
        icon: 'warning'
      });
      return; 
    }
  
    if(Array.isArray(savedUsers)){
        const foundUser = savedUsers.find((savedUser) => savedUser.username == user && savedUser.password == pass);
        if (foundUser){
            console.log("Dentro");
            window.location.href = "../user/grupos.html"; 
        } else {
            swal({
                title: "Nombre de usuario o/y contraseña incorrectos",
                icon: 'warning'
            })
        }
    } else {
        swal({
            title: "No hay usuarios registrados.",
            icon: 'warning'
        });
    }

  };

  document.getElementById('Login-form').addEventListener('submit', validateLogin);