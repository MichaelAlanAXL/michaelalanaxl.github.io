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


// Alternar classe active dos menus
const menuLinks = document.querySelectorAll(".menu__link");
menuLinks.forEach(item => {
    item.addEventListener('click', () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

// Alternar a classe active conforme rola a página
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 70; // ajuste se header for fixo
        const sectionId = section.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            menuLinks.forEach(link => {
                link.classList.remove("active");
                if(link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// função para pegar ano atual dinâmica
function setCurrentYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}

setCurrentYear();

// adicionar dinamicamente meus projetos via JSON
fetch("./assets/data/projetos.json")
    .then(res => res.json())
    .then(projetos => {
        const container = document.getElementById("projects-container");

        projetos.forEach((projeto, index) => {
            // wrapper geral do projeto
            const project = document.createElement("div");
            project.classList.add("project");

            // Aplica reverse se for o segundo
            if (index === 1) {
                project.classList.add("projects--reverse");
            }

            const projectsContainer = document.createElement("div");
            projectsContainer.classList.add("projects__container");

            const imagem = document.createElement("img");
            imagem.src = projeto.imagem;
            imagem.alt = `Imagem do projeto ${projeto.titulo}`;
            const wrapperImg = document.createElement("div");
            wrapperImg.classList.add("projects__image");            
            wrapperImg.appendChild(imagem);

            const titulo = document.createElement("h3");
            titulo.classList.add("projects__title");
            titulo.textContent = projeto.titulo;

            const descricao = document.createElement("p");
            descricao.classList.add("projects__description");
            descricao.textContent = projeto.descricao;

            const lista = document.createElement("ul");
            projeto.habilidades.forEach(habilidade => {
                const item = document.createElement("li");
                item.textContent = habilidade;
                lista.appendChild(item);
            });

            // adiciona botões previa e repositório 
            const botoesWrapper = document.createElement("div"); // Cria a div
            botoesWrapper.classList.add("card__buttons"); // Depois cria a classe dela
            projeto.botoes.forEach(botao => {
                const button = document.createElement("a");
                button.href = botao.link; // Cria elemento href
                button.target = "_blank"; 
                button.className = botao.classe; // pega o nome da classe e adiciona no elemento button

                const span = document.createElement("span");
                span.textContent = botao.texto; // Pega o nome do texto do botão e joga dentro da tag <span>
                button.appendChild(span);

                if(botao.icone) {
                    const icone = document.createElement("i"); // Se existir icone no botão => cria elemento
                    icone.className = botao.icone; // Adiciona o nome da classe do ícone 
                    button.appendChild(icone);
                }

                botoesWrapper.appendChild(button);
            });

            const wrapperTexto = document.createElement("div");
            wrapperTexto.classList.add("projects__title");
            wrapperTexto.appendChild(titulo);
            wrapperTexto.appendChild(descricao);
            wrapperTexto.appendChild(lista);
            wrapperTexto.appendChild(botoesWrapper);

            projectsContainer.appendChild(wrapperImg);
            projectsContainer.appendChild(wrapperTexto);

            project.appendChild(projectsContainer);

            container.appendChild(project);
        });
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));
