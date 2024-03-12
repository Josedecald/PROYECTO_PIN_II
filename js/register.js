const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const saveUsers = (event) =>{
    event.preventDefault(); 

    let user = document.getElementById('usr').value.trim();
    let pass = document.getElementById('pass').value.trim();
    let email = document.getElementById('Email').value.trim(); 
    
    if (!user || !pass || !email) { 
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!isValidEmail(email)) { 
        alert('Por favor, introduce una dirección de correo electrónico válida.');
        return;
    }

    if (pass.length < 8) { 
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    
    if (!/[A-Z]/.test(pass)) {
        alert("La contraseña debe contener al menos una letra mayúscula.");
        return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(pass)) {
        alert("La contraseña debe contener al menos un carácter especial.");
        return;
    }

    if (!/[0-9]/.test(pass)) {
        alert("La contraseña debe contener al menos un número.");
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

