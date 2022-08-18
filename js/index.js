const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';

const exibirEventos = async () => {
    const resposta = await fetch(SOUND_URL);
    const data = await resposta.json();
    const listagem = data.slice(0,3);

    const cardEvent = document.querySelector('#primeiros');
    let htmlEventos = ""
    listagem.forEach((event) => {

        htmlEventos += `
        <article class="evento card p-5 m-3">
        <h2>${event.name} - ${event.scheduled}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <button type="button" class="card-link btn btn-primary" data-toggle="modal" data-target="#exampleModal"
        data-whatever="${event.name}" data-whatever2="${event.attractions}" data-whatever3="${event.scheduled}"
        data-whatever4="${event._id}">reservar ingressos</button>
        </article>
        `
});

   cardEvent.innerHTML = htmlEventos

};

exibirEventos()

async function addBooking(event){
    event.preventDefault();
    let owner = document.querySelector('#nomeComprador').value;
    let email = document.querySelector('#email').value;
    let ticket = document.querySelector('#lotacao').value;
    let idIngresso = document.querySelector('#id').value;

    const data = {
        'owner_name': owner,
        'owner_email': email,
        'number_tickets': ticket,
        'event_id': idIngresso
    }
    const url = 'https://xp41-soundgarden-api.herokuapp.com/bookings';
    const response = await fetch(url, {
        method: 'POST',
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() => {
        alert('Reserva feita com sucesso!')
        window.location.href = 'index.html'
    }).catch(err => {
        console.log(err);
    })
}

const btnSubmit = document.getElementById('submit');
btnSubmit.onclick = (evento) => addBooking(evento);