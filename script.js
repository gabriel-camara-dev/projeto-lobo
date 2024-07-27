document.addEventListener('DOMContentLoaded', () => {
    let lobos = [];
    let loboIndexNaoAdotado = 0;
    let loboIndexAdotado = 0;
  
    function carregarLobos() {
      fetch('lobinhos%20(1).json') 
        .then(response => response.json()) 
        .then(data => {
          lobos = data;
        });
    }
  

    function criarCaixaLobo(lobo, index) {

        const caixaLobo = document.createElement('div');
        caixaLobo.classList.add('caixa_lobo');

        if (index % 2 !== 0) {
            caixaLobo.classList.add('invertida');
        }
    
        const backgroundImgLobo = document.createElement('div');
        backgroundImgLobo.classList.add('background_img_lobo');
        
        const imgLobo = document.createElement('div');
        imgLobo.classList.add('img_lobo');
    
        if (caixaLobo.classList.contains('invertida')) {
            imgLobo.classList.add('img_lobo_invertida');
        }
    
        imgLobo.style.backgroundImage = `url(${lobo.imagem})`;
        backgroundImgLobo.appendChild(imgLobo);

        const dadosLobo = document.createElement('div');
        dadosLobo.classList.add('dados_lobo');
    
        const infoLobo = document.createElement('div');
        infoLobo.classList.add('info_lobo');
    
        const nomeIdadeLobo = document.createElement('div');
        nomeIdadeLobo.classList.add('nome_idade_lobo');
    
        const nomeLobo = document.createElement('p');
        nomeLobo.classList.add('nome_lobo');
        nomeLobo.textContent = lobo.nome;
    
        const idadeLobo = document.createElement('p');
        idadeLobo.classList.add('idade_lobo');
    
        if (caixaLobo.classList.contains('invertida')) {
            idadeLobo.classList.add('invertida');
        }
    
        idadeLobo.innerHTML = `Idade: <span class="idade">${lobo.idade}</span> anos`;
    
        nomeIdadeLobo.appendChild(nomeLobo);
        nomeIdadeLobo.appendChild(idadeLobo);
    
        const btnAdotar = document.createElement('p');
        btnAdotar.classList.add('btn_adotar');
        btnAdotar.textContent = lobo.adotado ? 'Adotado' : 'Adotar';

        if (lobo.adotado) {
            btnAdotar.classList.add('adotado');
          }
    
        infoLobo.appendChild(nomeIdadeLobo);
        infoLobo.appendChild(btnAdotar);
    
        dadosLobo.appendChild(infoLobo);
    
        const descricaoLobo = document.createElement('p');
        descricaoLobo.classList.add('descricao_lobo');

        if (caixaLobo.classList.contains('invertida')) {
            descricaoLobo.classList.add('invertida');
        }
    
        descricaoLobo.textContent = lobo.descricao;

        dadosLobo.appendChild(descricaoLobo);
        caixaLobo.appendChild(backgroundImgLobo);
        caixaLobo.appendChild(dadosLobo);
    
        return caixaLobo;
        }
  
        function adicionarLoboNaoAdotado() {
            const container = document.getElementById('nao-adotados-container');
            if (container) {
              const lobosNaoAdotados = lobos.filter(lobo => !lobo.adotado);
              if (loboIndexNaoAdotado < lobosNaoAdotados.length) {
                const lobo = lobosNaoAdotados[loboIndexNaoAdotado];
                const caixaLobo = criarCaixaLobo(lobo, loboIndexNaoAdotado);
                container.appendChild(caixaLobo);
                loboIndexNaoAdotado++;
              } }}
        
          function adicionarLoboAdotado() {
            const container = document.getElementById('adotados-container');
            if (container) {
              const lobosAdotados = lobos.filter(lobo => lobo.adotado);
              if (loboIndexAdotado < lobosAdotados.length) {
                const lobo = lobosAdotados[loboIndexAdotado];
                const caixaLobo = criarCaixaLobo(lobo, loboIndexAdotado);
                container.appendChild(caixaLobo);
                loboIndexAdotado++;
              } }}

    // Carrega os dados do JSON quando a página é carregada
    carregarLobos();
  
    // Adiciona evento de click ao botão
    const botaoNaoAdotados = document.querySelector('.add-nao-adotados');
    const botaoAdotados = document.querySelector('.add-adotados');

    botaoNaoAdotados.addEventListener('click', adicionarLoboNaoAdotado)
    botaoAdotados.addEventListener('click', adicionarLoboAdotado)
})

  
  