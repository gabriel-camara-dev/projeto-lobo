document.addEventListener('DOMContentLoaded', () => {
    let pagina_inicial = 1
    const tamanho_pagina = 4

    const pagina_numeros_container = document.querySelector('.pagina_numeros_container')

    const container = document.querySelector('.lobos_container')
    const btn_voltar = document.querySelector('.btn_voltar')
    const btn_avançar = document.querySelector('.btn_avançar')
    const adotados_checkbox = document.querySelector('.adotados_checkbox')
    
    btn_voltar.textContent = '<<'
    btn_avançar.textContent = '>>'

    let lobos_lista = []
    let lobos_filtrados = []

    function carregarLobos() {
        return fetch('assets/js/lobinhos.json')
            .then(response => response.json())
            .then(data => {
                lobos_lista = data
                aplicarFiltros()
                return lobos_lista
            })
    }
    carregarLobos()

    function criarNovoLobo(novo_lobo) {
        return fetch('assets/js/lobinhos.json')
            .then(response => response.json())
            .then(data => {
                lobos = data
                lobos_lista.unshift(novo_lobo)
                atualizarExibicao() 
                return lobos
            })}
   
    function criarCaixaLobo(lobo, index) {
        const caixaLobo = document.createElement('div')
        caixaLobo.classList.add('caixa_lobo')

        if (index % 2 !== 0) {
            caixaLobo.classList.add('invertida')
        }

        const background_img_lobo = document.createElement('div')
        background_img_lobo.classList.add('background_img_lobo')

        const imgLobo = document.createElement('div')
        imgLobo.classList.add('img_lobo')

        if (caixaLobo.classList.contains('invertida')) {
            imgLobo.classList.add('img_lobo_invertida')
        }

        imgLobo.style.backgroundImage = `url(${lobo.imagem})`
        background_img_lobo.appendChild(imgLobo)

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

        if (lobo.adotado) {
            btnAdotar.classList.add('adotado')
            const caixa_dono = document.createElement('p')
            caixa_dono.classList.add('caixa_dono')
            caixa_dono.textContent = `Adotado por: ${lobo.nomeDono}`
            dadosLobo.appendChild(caixa_dono)
        }

        if (!btnAdotar.classList.contains('adotado'))
            btnAdotar.addEventListener('click', () => {
                window.location.href = '../../show_lobinho.html'
                localStorage.setItem('loboId', JSON.stringify(lobo))
            })

        caixaLobo.appendChild(background_img_lobo)
        caixaLobo.appendChild(dadosLobo)

        return caixaLobo
    }
 
    function aplicarFiltros() {
        const termo_procurar = input_barra_pesquisa.value.toLowerCase()
        const lobos_adotados = adotados_checkbox.checked

        lobos_filtrados = lobos_lista.filter(lobo => {
            const nomeMatch = lobo.nome.toLowerCase().includes(termo_procurar)
            const adotadoMatch = lobos_adotados ? lobo.adotado : !lobo.adotado
            return nomeMatch && adotadoMatch
        })
        pagina_inicial = 1
        atualizarExibicao()
        window.scrollTo(0, 0)
    }

    let input_barra_pesquisa = document.querySelector('.input_barra_pesquisa')
    let botao_procurar = document.querySelector('.botao_procurar')

    botao_procurar.addEventListener('click', aplicarFiltros)
    input_barra_pesquisa.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros()
        }
    })

    function atualizarExibicao() {
        console.log(lobos_lista)
        container.innerHTML = ''

        const index_inicial = (pagina_inicial - 1) * tamanho_pagina
        const index_final = index_inicial + tamanho_pagina
        const lobos_para_exibir = lobos_filtrados.slice(index_inicial, index_final)

        lobos_para_exibir.forEach((lobo, index) => {
            const caixaLobo = criarCaixaLobo(lobo, index_inicial + index)
            container.appendChild(caixaLobo)
        })
 
        /* PAGINAÇÃO */
        btn_voltar.disabled = pagina_inicial === 1
        btn_avançar.disabled = index_final >= lobos_filtrados.length
        atualizarPaginas()
    }

    function atualizarPaginas() {
        pagina_numeros_container.innerHTML = ''

        const total_paginas = Math.ceil(lobos_filtrados.length / tamanho_pagina)

        let primeira_pagina = Math.max(1, pagina_inicial - 2)
        let ultima_pagina = Math.min(total_paginas, primeira_pagina + 4)

        for (let i = primeira_pagina; i <= ultima_pagina; i++) {
        const pagina_numeracao = document.createElement('span')
        pagina_numeracao.textContent = i
        pagina_numeracao.classList.add('pagina_numeros')

        if (i === pagina_inicial) {
            pagina_numeracao.classList.add('active')
        }
        pagina_numeracao.addEventListener('click', () => {
            pagina_inicial = i
            atualizarExibicao()
            window.scrollTo(0,0)
        })
        pagina_numeros_container.appendChild(pagina_numeracao)
        }
    }

    adotados_checkbox.addEventListener('change', aplicarFiltros)

    console.log(lobos_filtrados)

    /* PAGINAÇÃO */
    btn_voltar.addEventListener('click', () => {
        if (pagina_inicial > 1) {
            pagina_inicial--
            atualizarExibicao()
            window.scrollTo(0, 0)
        }
    })
    btn_avançar.addEventListener('click', () => {
        const lobos_adotados = adotados_checkbox.checked
        const lobos_filtrados = lobos.filter(lobo => lobos_adotados ? lobo.adotado : !lobo.adotado)
        if (pagina_inicial * tamanho_pagina < lobos_filtrados.length) {
            pagina_inicial++
            atualizarExibicao()
            window.scrollTo(0, 0)
        }
    })
    /**/
    
})

window.addEventListener('load', () => {
    const lobo = JSON.parse(localStorage.getItem('loboId'))

    const lobo_nome = document.querySelector('.lobo_nome')
    lobo_nome.textContent = lobo.nome

    const descricao_lobo = document.querySelector('.descricao_lobo_escolhido')


    descricao_lobo.textContent = lobo.descricao
    imagem_lobo.style.backgroundImage = `url(${lobo.imagem})`
    descricao_lobo.textContent = lobo.descricao

    let imagem_lobo = document.querySelector('.imagem_teste')
    imagem_lobo.src = lobo.imagem
})
