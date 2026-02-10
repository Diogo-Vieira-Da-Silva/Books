 console.log('script.js externo carregado!');

document.getElementById('usuarioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        id: document.getElementById('id').value,
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value
    };

    // Validar CPF: deve ter exatamente 11 números
    if (!/^\d{11}$/.test(formData.cpf)) {
        alert('CPF deve conter exatamente 11 números!');
        return;
    }

    console.log('Enviando dados:', formData);

    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta:', data);
        alert(data);
        document.getElementById('usuarioForm').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro: ' + error);
    });
});
