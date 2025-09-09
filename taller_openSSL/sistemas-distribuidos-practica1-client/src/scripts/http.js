document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('response').innerHTML = `
            <h3>Respuesta del servidor:</h3>
            <p>Estado: ${result.status}</p>
            <p>Datos recibidos: ${JSON.stringify(result.receivedData)}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
    }
});