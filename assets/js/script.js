document.addEventListener('DOMContentLoaded', () => {
  let lobos = []
  let currentPage = 1
  const pageSize = 4

  const container = document.querySelector('.lobos_container')
  const btn_voltar = document.querySelector('.btn_voltar')
  const btn_avançar = document.querySelector('.btn_avançar')
  const adotados_checkbox = document.querySelector('.adotados_checkbox')
  
  btn_voltar.textContent = '<<'
  btn_avançar.textContent = '>>'

  function carregarLobos() {
      fetch('assets/js/lobinhos.json')
          .then(response => response.json())
          .then(data => {
              lobos = data
              atualizarExibicao()
          })
  }

  function criarCaixaLobo(lobo, index) {
      const caixaLobo = document.createElement('div')
      caixaLobo.classList.add('caixa_lobo')

      if (index % 2 !== 0) {
          caixaLobo.classList.add('invertida')
      }

      const backgroundImgLobo = document.createElement('div')
      backgroundImgLobo.classList.add('background_img_lobo')

      const imgLobo = document.createElement('div')
      imgLobo.classList.add('img_lobo')

      if (caixaLobo.classList.contains('invertida')) {
          imgLobo.classList.add('img_lobo_invertida')
      }

      imgLobo.style.backgroundImage = `url(${lobo.imagem})`
      backgroundImgLobo.appendChild(imgLobo)

      const dadosLobo = document.createElement('div')
      dadosLobo.classList.add('dados_lobo')

      const infoLobo = document.createElement('div')
      infoLobo.classList.add('info_lobo')

      const nomeIdadeLobo = document.createElement('div')
      nomeIdadeLobo.classList.add('nome_idade_lobo')

      const nomeLobo = document.createElement('p')
      nomeLobo.classList.add('nome_lobo')
      nomeLobo.textContent = lobo.nome

      const idadeLobo = document.createElement('p')
      idadeLobo.classList.add('idade_lobo')

      if (caixaLobo.classList.contains('invertida')) {
          idadeLobo.classList.add('invertida')
      }

      idadeLobo.innerHTML = `Idade: <span class="idade">${lobo.idade}</span> anos`

      nomeIdadeLobo.appendChild(nomeLobo)
      nomeIdadeLobo.appendChild(idadeLobo)

      const btnAdotar = document.createElement('p')
      btnAdotar.classList.add('btn_adotar')
      btnAdotar.textContent = lobo.adotado ? 'Adotado' : 'Adotar'

      if (lobo.adotado) {
          btnAdotar.classList.add('adotado')
      }

      infoLobo.appendChild(nomeIdadeLobo)
      infoLobo.appendChild(btnAdotar)

      dadosLobo.appendChild(infoLobo)

      const descricaoLobo = document.createElement('p')
      descricaoLobo.classList.add('descricao_lobo')

      if (caixaLobo.classList.contains('invertida')) {
          descricaoLobo.classList.add('invertida')
      }

      descricaoLobo.textContent = lobo.descricao

      dadosLobo.appendChild(descricaoLobo)
      caixaLobo.appendChild(backgroundImgLobo)
      caixaLobo.appendChild(dadosLobo)

      return caixaLobo
  }

  function atualizarExibicao() {
      container.innerHTML = '' // Limpa o contêiner antes de adicionar novos lobos

      // Filtra os lobos com base na checkbox
      const adotadosFiltro = adotados_checkbox.checked
      const lobosFiltrados = lobos.filter(lobo => adotadosFiltro ? lobo.adotado : !lobo.adotado)

      // Paginacao
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      const lobosParaExibir = lobosFiltrados.slice(startIndex, endIndex)

      lobosParaExibir.forEach((lobo, index) => {
          const caixaLobo = criarCaixaLobo(lobo, startIndex + index)
          container.appendChild(caixaLobo)
      })

      // Atualiza o estado dos botões de navegação
      btn_voltar.disabled = currentPage === 1
      btn_avançar.disabled = endIndex >= lobosFiltrados.length
  }

  // Funções para navegação de página
  btn_voltar.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--
          atualizarExibicao()
      }
  })

  btn_avançar.addEventListener('click', () => {
      const adotadosFiltro = adotados_checkbox.checked
      const lobosFiltrados = lobos.filter(lobo => adotadosFiltro ? lobo.adotado : !lobo.adotado)
      if (currentPage * pageSize < lobosFiltrados.length) {
          currentPage++
          atualizarExibicao()
      }
  })

  adotados_checkbox.addEventListener('change', () => {
      currentPage = 1
      atualizarExibicao()
  })

  carregarLobos()
})
