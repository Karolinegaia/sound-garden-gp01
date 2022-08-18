const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';
const listarEventos = async () => {

    const eventos = await fetch(SOUND_URL, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {

    return resposta.json();
    });
    const todosEventos = document.querySelector('#eventos');
    let cards = '';

    eventos.forEach(evento => {
        cards += `            
        <article class="evento maxw card p-5 m-3">
        <h2>${evento.name} - ${evento.scheduled}</h2>
        <h4>${evento.attarctions}</h4>
        <p>${evento.description}</p>
        <button type="button" class="card-link btn btn-primary" data-toggle="modal" data-target="#exampleModal"
        data-whatever="${evento.name}" data-whatever2="${evento.attarctions}" data-whatever3="${evento.scheduled}"
        data-whatever4="${evento._id}">reservar ingressos</button>
        </article>
        `    
    });

    todosEventos.innerHTML = cards;
}

listarEventos();

 
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
        window.location.href = 'eventos.html'
    }).catch(err => {
        console.log(Err);
    })
}

const btnSubmit = document.getElementById('submit');
btnSubmit.onclick = (evento) => addBooking(evento);