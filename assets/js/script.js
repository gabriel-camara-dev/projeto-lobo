document.addEventListener('DOMContentLoaded', () => {
    let pagina_inicial = 1
    const tamanho_pagina = 4

    const pagina_numeros_container = document.querySelector('.pagina_numeros_container')

    const container = document.querySelector('.lobos_container')
    const btn_voltar = document.querySelector('.btn_voltar')
    const btn_avançar = document.querySelector('.btn_avançar')
    const adotados_checkbox = document.querySelector('.adotados_checkbox')
    const input_barra_pesquisa = document.querySelector('.input_barra_pesquisa')

    let lobos_lista = JSON.parse(localStorage.getItem('lobos'))
    let lobos_filtrados = []
    aplicarFiltros()

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

    input_barra_pesquisa.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros()
        }
    })
 
    function aplicarFiltros() {
        const termo_procurar = input_barra_pesquisa.value.toLowerCase()
        const lobos_adotados = adotados_checkbox.checked

        lobos_filtrados = lobos_lista.filter(lobo => {
            if (lobo === null) {} 
            else { const nomeMatch = lobo.nome.toLowerCase().includes(termo_procurar)
                const adotadoMatch = lobos_adotados ? lobo.adotado : !lobo.adotado
                return nomeMatch && adotadoMatch
            }
        })
        console.log(lobos_filtrados)
        termo_procurar.textContent = ''
        pagina_inicial = 1
        atualizarExibicao()
        window.scrollTo(0, 0)
    }

    function atualizarExibicao() {
        console.log(lobos_filtrados)
        container.innerHTML = ''

        const index_inicial = (pagina_inicial - 1) * tamanho_pagina
        const index_final = index_inicial + tamanho_pagina
        const lobos_para_exibir = lobos_filtrados.slice(index_inicial, index_final)

        lobos_para_exibir.forEach((lobo, index) => {
          if (lobo !== null) {
        const caixaLobo = criarCaixaLobo(lobo, index_inicial + index);
        container.appendChild(caixaLobo);
    } else {
        console.log("lobo-id = null");
    }
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

    /* PAGINAÇÃO */
    btn_voltar.addEventListener('click', () => {
        if (pagina_inicial > 1) {
            pagina_inicial--
            atualizarExibicao()
            window.scrollTo(0, 0)
        }
    })
    btn_avançar.addEventListener('click', () => {
        if (pagina_inicial * tamanho_pagina < lobos_filtrados.length) {
            pagina_inicial++
            atualizarExibicao()
            window.scrollTo(0, 0)
        }
    })

    btn_voltar.textContent = '<<'
    btn_avançar.textContent = '>>'
    /**/
    
})

document.addEventListener('DOMContentLoaded', () => {
    const lobo = JSON.parse(localStorage.getItem('loboId'))
    if (lobo === null) {} else { 

        const lobo_nome = document.querySelector('.lobo_nome')
        
        lobo_nome.textContent = "Adotar " + lobo.nome
    
        const descricao_lobo = document.querySelector('.descricao_lobo_escolhido')
        descricao_lobo.textContent = lobo.descricao
    
        let imagem_lobo = document.querySelector('.imagem_teste')
        imagem_lobo.src = lobo.imagem
    }
})
