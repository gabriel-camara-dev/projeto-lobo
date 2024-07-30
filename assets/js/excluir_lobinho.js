function enviarDados() {

    const lobo = JSON.parse(localStorage.getItem('loboId'))
    let lobos_lista = JSON.parse(localStorage.getItem('lobos'))
    lobos_lista[lobo.id - 1] = null
    localStorage.setItem('lobos', JSON.stringify(lobos_lista))
    window.location.href = "lista_lobinho.html";
}