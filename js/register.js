const saveUsers = (event) =>{
    event.preventDefault(); 

    let user = document.getElementById('usr').value.trim();
    let pass = document.getElementById('pass').value.trim();


    let savedUsers  = JSON.parse(localStorage.getItem('USERS')) || [];

    let newUser = {
        username: user,
        password: pass
    };

    savedUsers .push(newUser);

    localStorage.setItem('USERS', JSON.stringify(savedUsers))

    document.getElementById('usr').value = '';
    document.getElementById('pass').value = '';

};
document.getElementById('Register-form').addEventListener('submit', saveUsers);