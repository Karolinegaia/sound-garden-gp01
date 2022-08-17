async function addEvent (evento) {
    let nomeForm = document.getElementById('nome').value;
    let atracaoForm = document.getElementById('atracoes').value;
    let descricaoForm = document.getElementById('descricao').value;
    let dataForm = document.getElementById('data').value;
    let lotacaoForm = document.getElementById('lotacao').value;
    evento.preventDefault();
    const data = {
        'name' : nomeForm,
        'poster' : 'teste',
        'attractions' : atracaoForm.split(','),
        'description' : descricaoForm,
        'scheduled' : dataForm,
        'number_tickets' : lotacaoForm
    }
    console.log(JSON.stringify(data));
    const url =  'https://xp41-soundgarden-api.herokuapp.com/events';
    const response = await fetch(url, {
        method: 'POST',
        mode : 'cors',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        alert('Evento Criado com sucesso!')
        window.location.href = './admin.html'
    })
    .catch(err => {
        console.log(err);
    })
    console.log(response);
}

async function getEvent() {
    const url = 'https://xp41-soundgarden-api.herokuapp.com/events';
    const data = fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
    })
    .then((response) => response.json())
    .then ((data) => {
        data.map(value => {
            if (value.description.includes('gp01-xp44')) {
                let tableBody = '';
                tableBody += `<tr>`;
                tableBody += `<th>${value._id}</th>`;
                tableBody += `<td>${value.scheduled}</td>`;
                tableBody += `<td>${value.name}</td>`;
                tableBody += `<td>${value.attractions.join(',')}</td>`;
                tableBody += `<td>`;
                    tableBody += `<a href="reservas.html" class="btn btn-dark">ver reservas</a>`;
                    tableBody += `<a href="editar-evento.html?id=${value._id}" class="btn btn-secondary">editar</a>`;
                    tableBody += `<a href="excluir-evento.html?id=${value._id}" class="btn btn-danger">excluir</a>`;
                tableBody += `</td>`;
                tableBody += `</tr>`;
                let tableRow = document.getElementById('tableBody').insertRow(0);
                tableRow.innerHTML = tableBody;
            }
        })
    })
}

async function getEventById(id) {
    const url = `https://xp41-soundgarden-api.herokuapp.com/events/${id}`
    const data = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },    
    })
    .then((response) => response.json())
    .then ((data) => {
        document.getElementById('id').value = data._id;
        document.getElementById('nome').value = data.name;
        document.getElementById('atracoes').value = data.attractions.join(',');
        document.getElementById('descricao').value = data.description;
        document.getElementById('banner').value = data.poster;
        document.getElementById('data').value = data.scheduled;
        document.getElementById('lotacao').value = data.number_tickets;
    })
}

async function updateEvent(evento) {
    let idForm = document.getElementById('id').value;
    let nomeForm = document.getElementById('nome').value;
    let atracaoForm = document.getElementById('atracoes').value;
    let descricaoForm = document.getElementById('descricao').value;
    let dataForm = document.getElementById('data').value;
    let lotacaoForm = document.getElementById('lotacao').value;
    evento.preventDefault()
    const data = {
        'name' : nomeForm,
        'poster' : 'teste',
        'attractions' : atracaoForm.split(','),
        'description' : descricaoForm,
        'scheduled' : dataForm,
        'number_tickets' : lotacaoForm
    }
    const url = `https://xp41-soundgarden-api.herokuapp.com/events/${idForm}`;
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        alert('Evento Atualizado com sucesso!')
        window.location.href = './admin.html'
    })
    .catch(err => {
        console.log(err);
    })
}

async function deleteEvent(evento) {
    const idForm = document.getElementById('id').value;
    const url = `https://xp41-soundgarden-api.herokuapp.com/events/${idForm}`
    evento.preventDefault();
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
    }).then(() => {
        alert('Evento Apagado com sucesso!');
        window.location.href = './admin.html';
        })
        .catch(err => {
            console.log(err);
    })
}

