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
    loboAdotado();
    alert("O lobinho foi adotado com sucesso!");
  } else {
    alert("O lobinho não foi adotado.");
    }
  }
};

function loboAdotado() {
    fetch('assets/js/lobinhos.json')
  .then(response => response.json())
  .then(data => {
    // 'data' é um array de objetos, escreve tudo aqui dentro

    console.log(data);
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));
}

window.addEventListener('load', () => {
    const lobo = JSON.parse(localStorage.getItem('loboId'))

    var lobo_nome = document.querySelector('.nome_lobo')
    lobo_nome.textContent = "Adotar o(a) " + lobo.nome

    const id_lobo = document.querySelector(".id_lobo")

    id_lobo.textContent = "ID:" + lobo.id

    let imagem_lobo = document.querySelector('.img_adotar_lobo')
    imagem_lobo.src = lobo.imagem
})