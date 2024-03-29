document.addEventListener("DOMContentLoaded", () => {
  const Preview = (n) => {
    let text = document.getElementById("text" + n).value;
    document.getElementById("preview" + n).textContent = text;
  };

  document.getElementById("enterphrase").addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("text3").value = "";
    swal({
      title: "Frases cargadas",
      icon: "success",
      button: "Salir",
    });
    for (let i = 1; i <= 3; i++) {
      let text = document.getElementById("text" + i).value;
      if (text.trim() !== "") {
        localStorage.setItem("typedText" + i, text);
        Preview(i);
      } else {
        swal({
          title: "Asegurate de introducir una frase en todos los campos!!",
          icon: "warning",
          button: "Salir",
        });
      }
    }
  });
});
