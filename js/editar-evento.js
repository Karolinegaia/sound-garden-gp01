const findID = () => {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    return id;}


const exibirDetalhesEvento = async () => {
    const dadosEvento =
        await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findID(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json());

    console.log(dadosEvento);

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

    inputNome.value = dadosEvento.name;
    inputAtracoes.value = dadosEvento.attractions.join(', ');
    inputBanner.value = dadosEvento.poster;
    inputDescricao.value = dadosEvento.description;
    inputData.value = dadosEvento.scheduled;
    inputLotacao.value = dadosEvento.number_tickets;
}

exibirDetalhesEvento();

const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events/' + findID();

const formCadastroEvento = document.querySelector('#editar-evento');

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
        method: "PUT",
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
        alert('Evento Editado com Sucesso!');
        window.location.href = './admin.html';    
    })
    .catch(err => {
        alert('Cadastro não efetuado!')
        console.log(err);
    });
    console.log(resposta)
});