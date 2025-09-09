// 1. Importar los módulos necesarios para HTTPS y WebSocket seguro
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// 2. Definir el host y el puerto
const HOST = '127.0.0.1'; // localhost
const PORT = 8095;

// 3. Opciones del certificado SSL
const options = {
    key: fs.readFileSync('key.pem'), // Cargar la clave privada
    cert: fs.readFileSync('cert.pem') // Cargar el certificado público
};

// 4. Crear el servidor HTTPS
const server = https.createServer(options, (req, res) => {
    // 5. Establecer la cabecera para indicar que la respuesta es JSON
    res.setHeader('Content-Type', 'application/json');
    // 6. Escribir el código de estado HTTP 200 OK
    res.writeHead(200);

    // 7. Los datos que enviaremos. ¡Ahora viajarán de forma segura!
    const responseData = {
        message: "¡Hola! Este servidor WebSocket ahora SÍ está cifrado.",
        websocket: "wss://" + HOST + ":" + PORT,
        status: "secure"
    };

    // 8. Enviar la respuesta como una cadena de texto JSON y finalizar
    res.end(JSON.stringify(responseData));
});

// 9. Crear el servidor WebSocket seguro usando el servidor HTTPS
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado de forma segura');

  // Enviar mensaje cada 3 segundos
  const interval = setInterval(() => {
    ws.send(`Hora del servidor (cifrado): ${new Date().toLocaleTimeString()}`);
  }, 3000);

  // Manejar cierre de conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clearInterval(interval); // Detener el intervalo
  });
});

// 10. Poner el servidor a escuchar en el puerto y host especificados
server.listen(PORT, HOST, () => {
    // 11. Mensaje de confirmación actualizado para HTTPS y WebSocket seguro
    console.log(`🚀 Servidor WebSocket seguro corriendo en wss://${HOST}:${PORT}`);
    console.log(`🔒 Servidor HTTPS corriendo en https://${HOST}:${PORT}`);
});