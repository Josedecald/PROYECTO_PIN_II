const Toggletheme = () => {
  let elements = document.querySelectorAll(
    ".bg-dark, .text-light, .bg-light, .text-dark"
  );
  elements.forEach((element) => {
    element.classList.toggle("bg-dark");
    element.classList.toggle("text-light");
    element.classList.toggle("bg-light");
    element.classList.toggle("text-dark");
  });
};
