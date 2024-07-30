window.addEventListener('load', () => {
    const lobo = JSON.parse(localStorage.getItem('loboId'))

    const lobo_nome = document.querySelector('.nome_lobo')
    lobo_nome.textContent = "Adotar o(a) " + lobo.nome

    const id_lobo = document.querySelector(".id_lobo")
    id_lobo.textContent = "ID:" + lobo.id

    let imagem_lobo = document.querySelector('.img_adotar_lobo')
    imagem_lobo.src = lobo.imagem
})