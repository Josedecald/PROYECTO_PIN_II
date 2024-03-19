const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const saveUsers = (event) =>{
    event.preventDefault(); 

    swal({
        title: 'Registrado correctamente',
        icon: 'success'
    })

    let user = document.getElementById('usr').value.trim();
    let pass = document.getElementById('pass').value.trim();
    let email = document.getElementById('Email').value.trim(); 
    
    if (!user || !pass || !email) { 
        swal({
            title: 'Por favor, completa todos los campos.',
            icon: 'warning',
        });
        return;
    }

    if (!isValidEmail(email)) { 
        swal({
            title: 'Por favor, introduce una dirección de correo electrónico válida.',
            icon: 'warning',
        });
        return;
    }

    if (pass.length < 8) { 
        swal({
            title: "La contraseña debe tener al menos 8 caracteres.",
            icon: 'warning',
        });
        return;
    }

    
    if (!/[A-Z]/.test(pass)) {
        swal({
            title: "La contraseña debe contener al menos una letra mayúscula.",
            icon: 'warning',
        });
        return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(pass)) {
        swal({
            title: "La contraseña debe contener al menos un carácter especial.",
            icon: 'warning',
        });
        return;
    }

    if (!/[0-9]/.test(pass)) {
        swal({
            title: "La contraseña debe contener al menos un número.",
            icon: 'warning',
        });
        return;
    }


    let savedUsers  = JSON.parse(localStorage.getItem('USERS')) || [];

    let newUser = {
        username: user,
        password: pass
    };

    savedUsers .push(newUser);

    localStorage.setItem('USERS', JSON.stringify(savedUsers))

    document.getElementById('usr').value = '';
    document.getElementById('pass').value = '';
    document.getElementById('Email').value = '';

};
document.getElementById('Register-form').addEventListener('submit', saveUsers);