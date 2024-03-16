const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const saveUsers = (event) =>{
    event.preventDefault(); 

    let fullname = document.getElementById('fullname').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim(); 
    
    if (!fullname || !password || !email) { 
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!isValidEmail(email)) { 
        alert('Por favor, introduce una dirección de correo electrónico válida.');
        return;
    }

    if (password.length < 8) { 
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    
    if (!/[A-Z]/.test(password)) {
        alert("La contraseña debe contener al menos una letra mayúscula.");
        return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
        alert("La contraseña debe contener al menos un carácter especial.");
        return;
    }

    if (!/[0-9]/.test(password)) {
        alert("La contraseña debe contener al menos un número.");
        return;
    }

    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
};

document.getElementById('Register-form').addEventListener('submit', saveUsers);
