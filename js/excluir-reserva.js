const findID = () => {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    return id;

}

async function getBookingById() {
    const url = `https://xp41-soundgarden-api.herokuapp.com/bookings/`+ findID();
    const data = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('id').value = data._id;
        document.getElementById('nome').value = data.owner_name;
        document.getElementById('email').value = data.owner_email;
        document.getElementById('lotacao').value = data.number_tickets;
    });
}

getBookingById()

const deleteBooking = document.querySelector('#excluir-reserva');

deleteBooking.addEventListener('submit', async (evento) => {
    const idForm = document.getElementById('id').value;
    const url = `https://xp41-soundgarden-api.herokuapp.com/bookings/${idForm}`;
    evento.preventDefault();
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(() => {
        alert('Reserva Apagada com Sucesso!');
        window.location.href = 'admin.html';
    })
    .catch(err => {
        console.log(err);
    })
});