const socket = io();

async function addMessage(e) {
    const tiempo = new Date()
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        time: tiempo.toString()
    }

    socket.emit('nuevoMensaje', mensaje);
    return false;
}

function makeHTML(mensajes) {
    return mensajes.map((elem, index) => {
        return (`<div>
            <strong>${elem.author}              </strong>:
            <em>${elem.text}</em> 
            <i>${elem.time}</i> </div>`)
    }).join(" ")
}

function render(mensajes) {
    const html = makeHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('mensajes', mensajes => {
    render(mensajes)
});


