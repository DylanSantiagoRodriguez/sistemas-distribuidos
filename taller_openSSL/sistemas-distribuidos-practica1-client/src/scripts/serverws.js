document.getElementById('btnWebSocket').addEventListener('click', () => {
   
    const ws = new WebSocket('ws://localhost:8090');

    // Evento al conectarse
    ws.addEventListener('open', () => {
      console.log('Conectado al servidor');
      ws.send('Hola, servidor!');
    });

    // Escuchar mensajes del servidor
    ws.addEventListener('message', (event) => {
      console.log('Respuesta del servidor:', event.data);
    });

});

document.getElementById('btnWebSocket2').addEventListener('click', () => {
   
    const ws = new WebSocket('ws://localhost:8095');
        const messagesDiv = document.getElementById('messages');

        // Cuando llega un mensaje
        ws.onmessage = (event) => {
            const message = document.createElement('div');
            message.textContent = event.data;
            messagesDiv.appendChild(message);
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
        };

        // Manejar errores
        ws.onerror = (error) => {
            console.error('Error:', error);
        };
});


