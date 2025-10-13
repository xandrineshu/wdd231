// Hamburger

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;
