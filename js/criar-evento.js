const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';

const formCadastroEvento = document.querySelector('#cadastro-evento');

formCadastroEvento.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

         const novoEventoObj = {
        "name": inputNome.value,
        "poster": inputBanner.value,
        "attractions": inputAtracoes.value.split(","),
        "description": inputDescricao.value,
        "scheduled": inputData.value,
        "number_tickets": inputLotacao.value
    };

    const novoEventoJSON = JSON.stringify(novoEventoObj);

    const resposta = await fetch(SOUND_URL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: novoEventoJSON
    }).then((response) => {
        return response.json();
    }).then((responseOBJ) => {
        console.log(responseOBJ);
    }).then (() => {
        alert('Evento Criado com Sucesso!');
        window.location.href = './admin.html';    
    })
    .catch(err => {
        alert('Cadastro não efetuado!')
        console.log(err);
    });
    console.log(resposta)
});