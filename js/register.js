

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};     

const agregarcontacto = (event) => {

    event.preventDefault();

        const v_nombre = document.getElementById('txtNombre').value
        const v_correo = document.getElementById('txtEmail').value
        const v_password = document.getElementById('txtPassword').value
        const v_edad = document.getElementById('txtEdad').value
        const v_genero = document.getElementById('txtGenero').value
        const v_carrera = document.getElementById('txtCarrera').value

        if (!v_nombre || !v_correo || !v_password || !v_edad || !v_genero || !v_carrera) { 
            swal({
                title: 'Por favor, completa todos los campos.',
                icon: 'warning',
            });
            return;
        }
    
        if (!isValidEmail(v_correo)) { 
            swal({
                title: 'Por favor, introduce una dirección de correo electrónico válida.',
                icon: 'warning',
            });
            return;
        }
    
        if (v_password.length < 8) { 
            swal({
                title: "La contraseña debe tener al menos 8 caracteres.",
                icon: 'warning',
            });
            return;
        }
    
        
        if (!/[A-Z]/.test(v_password)) {
            swal({
                title: "La contraseña debe contener al menos una letra mayúscula.",
                icon: 'warning',
            });
            return;
        }
    
        if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(v_password)) {
            swal({
                title: "La contraseña debe contener al menos un carácter especial.",
                icon: 'warning',
            });
            return;
        }
    
        if (!/[0-9]/.test(v_password)) {
            swal({
                title: "La contraseña debe contener al menos un número.",
                icon: 'warning',
            });
            return;
        }

         
                axios ({
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/add_user',
                    data: {
                            nombre:v_nombre,
                            email:v_correo,
                            password:v_password,
                            edad:v_edad,
                            genero:v_genero,
                            carrera:v_carrera                      
                        },
                  }).then(function (response) {
                    swal({
                        title: "Usuario registrado con exito",
                        icon: 'success'
                    })
                    window.location.href = '../index.html';
                  }).catch(err => {
                    console.log('Error: ', err);
                });
            }
            document.getElementById("Register-form").addEventListener('submit', agregarcontacto)
        
