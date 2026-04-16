const traducoesNavBar = {

    'pt-br': {
        navbar_perfil: "Perfil",
        navbar_projetos: "Projetos",
        navbar_educacao: "Educação",
        navbar_profissional: "Experiência"
    },
    'en': {
        navbar_perfil: "Profile",
        navbar_projetos: "Projects",
        navbar_educacao: "Education",
        navbar_profissional: "Experience"
    }
};

window.addEventListener('message', (evento) => {
    if (evento.data.tipo === 'TROCAR_IDIOMA') {
        const idioma = evento.data.idioma;
        
        const elementos = document.querySelectorAll('[data-i18n]');
        elementos.forEach(el => {
            const chave = el.getAttribute('data-i18n');
            if (traducoesNavBar[idioma][chave]) {
                el.innerText = traducoesNavBar[idioma][chave];
            }
        });
    }
});