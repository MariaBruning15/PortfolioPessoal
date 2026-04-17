
let paginaAtual = 1; 
const ACCESS_KEY = 'Tpy16QMHKKRWouwqfcaz0g6ZQjyWP_gnUZYCiEHqn8M'; //chave de acesso da API
const COLLECTION_ID = 'qv2RavWDPJA'; //id da coleção

async function carregarGaleria() {
    const grid = document.getElementById('grid-fotos'); //seleciona o container o das fotos
    
    const url = `https://api.unsplash.com/collections/${COLLECTION_ID}/photos?client_id=${ACCESS_KEY}&per_page=4&page=${paginaAtual}`; //URL da API

    try {
        const response = await fetch(url); //chama a API pra pegar as fotos
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`); //verifica se a resposta da API foi bem-sucedida
        }
        
        const fotos = await response.json(); //converte a resposta para JSON

        // Se a coleção termina ou está vazia
        if (fotos.length === 0) {
            console.log("Nenhuma foto encontrada ou fim da coleção."); //registra no console que não há mais fotos
            return;
        }

        fotos.forEach(foto => { //para cada foto retornada pela API
            const img = document.createElement('img'); //cria um elemento de imagem
            img.src = foto.urls.regular; //define a URL da imagem
            img.classList.add('foto-galeria'); //adiciona uma classe para estilização
            img.alt = foto.alt_description || "Ilustração Unsplash"; //adiciona uma descrição alternativa
            grid.appendChild(img); //adiciona a imagem ao container da galeria
        });

        paginaAtual++;

    } catch (error) {
        console.error("Erro ao carregar fotos:", error); //registra erros
    }
}


window.addEventListener('load', carregarGaleria); //carrega as fotos quando a página é carregada