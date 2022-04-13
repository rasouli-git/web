
const toggler = document.querySelector(".hamburgur");
const navbar = document.querySelector(".menu");
toggler.addEventListener("click", (e) => {
  navbar.classList.toggle("active");
});