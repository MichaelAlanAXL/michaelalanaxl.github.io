// Botão troca de tema dark/light
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement

function changeTheme() {
    const currentTheme = rootHtml.getAttribute("data-theme");

    currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme",   "dark")

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener('click', changeTheme);

// cosntante para pegar 'entrada na tela' (quando usuário rolar a página e chegar na section)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animar apenas uma vez
        }
    });
}, {
    threshold: 0.5
});

// 'olhar' o titulo (nesse caso o h2)
const title = document.querySelector('.skills__title');
observer.observe(title);

// 'olhar' cada imagem (nessa caso nossas skills ao lado do h2)
const skillsItems = document.querySelectorAll('.skills__item');
skillsItems.forEach(item => observer.observe(item));

// função para pegar ano atual dinâmica
function setCurrentYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}

setCurrentYear();