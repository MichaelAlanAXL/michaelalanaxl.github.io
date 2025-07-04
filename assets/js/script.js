// Botão troca de tema dark/light
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    rootHtml.setAttribute("data-theme", savedTheme);

    if (savedTheme === "dark") {
        toggleTheme.classList.add("bi-sun");
        toggleTheme.classList.remove("bi-moon-stars");
    } else {
        toggleTheme.classList.add("bi-moon-stars");
        toggleTheme.classList.remove("bi-sun");
    }
}

function changeTheme() {
    const currentTheme = rootHtml.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";
    rootHtml.setAttribute("data-theme", newTheme);

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");

    // Salvar tema no localStorage
    localStorage.setItem("theme", newTheme);
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

const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach(item => {
    item.addEventListener('click', () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    })
})

// função para pegar ano atual dinâmica
function setCurrentYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}

setCurrentYear();

fetch("./data/projetos.json")
    .then(response => response.json())
    .then(projetos => {
        const container = document.getElementById("");

        projetos.forEach(projeto => {
            const tituloElement = document.createElement("h3");
            tituloElement.textContent = projeto.titulo;
            tituloElement.ATTRIBUTE_NODE.classList.add("project-title");
            container.appendChild(tituloElement);
        });
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));
