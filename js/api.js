// Variáveis de configuração no topo do arquivo
let paginaAtual = 1; 
const ACCESS_KEY = 'Tpy16QMHKKRWouwqfcaz0g6ZQjyWP_gnUZYCiEHqn8M'; 
const COLLECTION_ID = 'qv2RavWDPJA';

async function carregarGaleria() {
    const grid = document.getElementById('grid-fotos');
    
    // Conforme a documentação: incluímos per_page E page para garantir a entrega correta
    const url = `https://api.unsplash.com/collections/${COLLECTION_ID}/photos?client_id=${ACCESS_KEY}&per_page=4&page=${paginaAtual}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const fotos = await response.json();

        // Se a coleção termina ou está vazia
        if (fotos.length === 0) {
            console.log("Nenhuma foto encontrada ou fim da coleção.");
            return;
        }

        // Renderização das fotos
        fotos.forEach(foto => {
            const img = document.createElement('img');
            // 'regular' é o recomendado pela doc para galerias de boa qualidade
            img.src = foto.urls.regular; 
            img.classList.add('foto-galeria'); 
            img.alt = foto.alt_description || "Ilustração Unsplash";
            grid.appendChild(img);
        });

        // Incrementa para que a próxima chamada (se houver botão no futuro) pegue fotos novas
        paginaAtual++;

    } catch (error) {
        console.error("Erro ao carregar fotos:", error);
    }
}

// Inicialização correta
window.addEventListener('load', carregarGaleria);