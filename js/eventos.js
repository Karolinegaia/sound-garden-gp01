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