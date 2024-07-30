document.addEventListener('DOMContentLoaded', () => {
    function carregandoJSON(){
        fetch("assets/js/lobinhos.json")
        .then(response => response.json())
        .then(data => {
                    lobos_lista = data
                    if (!localStorage.getItem('lobos')) {
                        localStorage.setItem('lobos', JSON.stringify(lobos_lista))
                    }
                    /********Escolhendo 2 valores aleatorios**********/
                    function indexAleatorio(tamanhoArray) {
                        return Math.floor(Math.random() * tamanhoArray);
                    }
                    
                    let primeiroIndex = indexAleatorio(data.length);
                    let segundoIndex;
                    do {
                    segundoIndex = indexAleatorio(data.length);
                    } while (segundoIndex === primeiroIndex);
                    
                    // Obter os valores dos IDs nos índices selecionados
                    let primeiroId = data[primeiroIndex].id;
                    let segundoID = data[segundoIndex].id;
                    
                    
                    let nome = document.querySelector(".nome_lobo_normal");
                    let idade = document.querySelector(".idade_lobo_normal");
                    let descricao = document.querySelector(".descricao_lobo_normal");
                    let imagem = document.querySelector(".imagem_lobo_normal");
                    imagem = imagem.firstElementChild;
                    
                    nome.textContent = data[primeiroIndex].nome
                    idade.textContent = "Idade: "+data[primeiroIndex].idade+" anos"
                    descricao.textContent = data[primeiroIndex].descricao
                    imagem.src = data[primeiroIndex].imagem
                    
                    let nome_invertido = document.querySelector(".nome_lobo_invertido");
                    let idade_invertido = document.querySelector(".idade_lobo_invertido");
                    let descricao_invertido = document.querySelector(".descricao_lobo_invertido");
                    let imagem_invertido = document.querySelector(".imagem_lobo_invertido");
                    imagem_invertido = imagem_invertido.firstElementChild;

                    nome_invertido.textContent = data[segundoIndex].nome
                    idade_invertido.textContent = "Idade: "+data[segundoIndex].idade+" anos"
                    descricao_invertido.textContent = data[segundoIndex].descricao
                    imagem_invertido.src = data[segundoIndex].imagem
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
    }
    carregandoJSON(); 
})
