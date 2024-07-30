document.addEventListener('DOMContentLoaded', () => {
     const adicionar_lobinho_nome = document.querySelector('.adicionar_lobinho_nome')
     const adicionar_lobinho_idade = document.querySelector('.adicionar_lobinho_idade')
     const adicionar_lobinho_imagem = document.querySelector('.adicionar_lobinho_imagem')
     const adicionar_lobinho_descricao = document.querySelector('.adicionar_lobinho_descricao')
     const salvar = document.querySelector('.salvar')

     salvar.addEventListener('click', () => {
          adicionarLobo()
          resetarInputs()
     })

     function adicionarLobo() {
          const nome = adicionar_lobinho_nome.value
          if (nome.length <=3 || nome.length >= 60) {
               alert('Nome deve ter entre 3 a 60 caracteres')
               adicionar_lobinho_nome.value = ''
               return
          }
          const idade = parseInt(adicionar_lobinho_idade.value, 10)
          if (isNaN(idade) || idade <= 0 && idade <= 100) {
               alert('Insira um número inteiro positivo para a idade')
               adicionar_lobinho_idade.value = ''
               return
          }
          const imagem = adicionar_lobinho_imagem.value
          if (imagem === "") {
               alert('Insira um valor para a imagem')
          }
          const descricao = adicionar_lobinho_descricao.value
          if (descricao === '') {
               alert('Insira uma descrição para seu lobo')
          }

          let lobos_lista = JSON.parse(localStorage.getItem('lobos')) || []
          let lobo = {
               "id": lobos_lista.length,
               "nome": `${nome}`,
               "idade": idade,
               "descricao": `${descricao}`,
               "imagem": `${imagem}`,
               "adotado":false,
               "nomeDono":null,
               "idadeDono":null,
               "emailDono":null
          }

          lobos_lista.unshift(lobo)
          localStorage.setItem('lobos', JSON.stringify(lobos_lista))
     }
     function resetarInputs() {
          adicionar_lobinho_nome.value = ''
          adicionar_lobinho_idade.value = ''
          adicionar_lobinho_descricao.value = ''
          adicionar_lobinho_imagem.value = ''
     }
})