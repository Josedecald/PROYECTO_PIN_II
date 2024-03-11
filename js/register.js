const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
 
    if (!user || !ap || !pass || !email) { 
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

