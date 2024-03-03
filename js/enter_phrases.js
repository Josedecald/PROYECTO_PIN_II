const Preview = (n) => {
    let text = document.getElementById('text' + n).value;
    document.getElementById('preview' + n).textContent = text;
}

document.getElementById('enterphrase').addEventListener('submit', (event) => {
    event.preventDefault();
    for (let i = 1; i <= 3; i++) {
        let text = document.getElementById('text' + i).value;
        if (text.trim() !== '') {
            localStorage.setItem('typedText' + i, text);
            Preview(i);
        } else {
            console.error('Falta introducir la frase ' + i);
        }
    }
})