const findID = () => {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    return id;

}

const url = 'https://xp41-soundgarden-api.herokuapp.com/bookings/event/'+ findID()
console.log(url);
const listarReservas = async () => {
    const reservas= await fetch (url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        data.map(value => {
            let tableBody = '';
            tableBody += `
            <tr>
            <th>${value._id}</th>
            <td>${value.owner_name}</td>
            <td>${value.owner_email}</td>
            <td>${value.number_tickets}</td>
            <td>
            <a href="excluir-reserva.html?id=${value._id}" class="btn btn-danger exclui">excluir</a>
            </td>
            </tr>`
            let tbody = document.querySelector('#tableBody');
            tbody.innerHTML = tableBody;
        });
       
    })
}
listarReservas();