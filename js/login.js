
const validateLogin = (event) => {
    event.preventDefault(); 
    let savedUsers  = JSON.parse(localStorage.getItem('USERS')) || [];


    const user= document.getElementById("usr").value.trim();
    const pass = document.getElementById("pass").value.trim(); 
  
    if (user== "" || pass == "") { 
      alert("Por favor, rellene ambos espacios para iniciar sesión");
      return; // Detener la ejecución de la función si hay campos vacíos
    }
  
    if(Array.isArray(savedUsers)){
        const foundUser = savedUsers.find((savedUser) => savedUser.username == user && savedUser.password == pass);
        if (foundUser){
            console.log("Dentro");
            window.location.href = "../html/Main_user.html";
        } else {
            alert("Nombre de usuario o/y contraseña incorrectos")
        }
    
    }

  };

  document.getElementById('Login-form').addEventListener('submit', validateLogin);