const obterDados = (nomeVariavel, idioma) => { //verificar se a variável existe e se tem o idioma
    try {
        if (typeof window[nomeVariavel] !== 'undefined' && window[nomeVariavel][idioma]) {
            return window[nomeVariavel][idioma];
        }
    } catch (e) {
        console.warn(`Aviso: Módulo ${nomeVariavel} não carregado nesta página.`);
    }
    return {};
};

function mudarIdioma(idioma) {
    localStorage.setItem('linguagemPref', idioma); //salva a preferência do usuário no localStorage

    const dicionarioAtual = {
        ...obterDados('traducoesPerfil', idioma),
        ...obterDados('traducoesProjetos', idioma),
        ...obterDados('traducoesNavBar', idioma),
        ...obterDados('traducoesNavbar', idioma), 
        ...obterDados('traducoesEducacao', idioma),
        ...obterDados('traducoesProfissional', idioma),
        
    };

    const elementos = document.querySelectorAll('[data-i18n]'); //seleciona todos os elementos que tem o data-i18n
    elementos.forEach(el => {
        const chave = el.getAttribute('data-i18n');
        const traducao = dicionarioAtual[chave];

        if (traducao) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = traducao;
            } else {
                el.innerText = traducao;
            }
        }
    });


    const iframe = document.querySelector('iframe'); //envia o comando para o iframe (se existir) para ele também trocar o idioma
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ //envia uma mensagem para o iframe
            tipo: 'TROCAR_IDIOMA',
            idioma: idioma
        }, '*');
    }
}

document.addEventListener('DOMContentLoaded', () => { //ao carregar a página verifica se tem uma preferência salva
    const salva = localStorage.getItem('linguagemPref') || 'pt-br';
    mudarIdioma(salva);
});