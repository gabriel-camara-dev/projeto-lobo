function enviarDados() {
  let nome = document.getElementById("form_nome").value;
  let idade = document.getElementById("form_idade").value;
  let email = document.getElementById("form_email").value;
  if (nome == "" || idade == "" || email == "") {
    alert("Preencha todos os campos!");
    return;
  } else {
  let enviar = confirm('Tem certeza que deseja adotar o lobinho?');
  if (enviar) {
    const lobo = JSON.parse(localStorage.getItem('loboId'))
    let lobos_lista = JSON.parse(localStorage.getItem('lobos'))
    lobos_lista.splice(lobo.id - 1, 1)
    alert("O lobinho foi adotado com sucesso!");
  } else {
    alert("O lobinho não foi adotado.");
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
    const lobo = JSON.parse(localStorage.getItem('loboId'))

    var lobo_nome = document.querySelector('.nome_lobo')
    lobo_nome.textContent = "Adotar o(a) " + lobo.nome

    const id_lobo = document.querySelector(".id_lobo")
    id_lobo.textContent = "ID:" + lobo.id

    let imagem_lobo = document.querySelector('.img_adotar_lobo')
    imagem_lobo.src = lobo.imagem
})