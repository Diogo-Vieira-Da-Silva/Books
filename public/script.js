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
        
        const prefix = data.split('|')[0];
        const message = data.split('|')[1] || data;
        
        if (prefix === 'CRIAR') {
            alert(message);
            document.getElementById('usuarioForm').reset();
            window.location.href = '/livros.html?usuario_id=' + encodeURIComponent(formData.id);
        } else if (prefix === 'ENTRAR') {
            alert(message);
            window.location.href = '/livros.html?usuario_id=' + encodeURIComponent(formData.id);
        } else if (prefix === 'ERRO') {
            alert(message);
        } else {
            alert(data);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro: ' + error);
    });
});

// Event listener para formulário de livros
document.getElementById('livroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        ano: document.getElementById('ano').value,
        status: document.getElementById('status').value,
        nota: document.getElementById('nota').value,
        usuario_id: document.getElementById('usuario_id').value
    };

    console.log('Enviando dados do livro:', formData);

    fetch('/livros', {
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
        document.getElementById('livroForm').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro: ' + error);
    });
});

// Preencher usuario_id da URL ao carregar a página de livros
if (window.location.pathname === '/livros.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('usuario_id');
    if (usuarioId) {
        document.getElementById('usuario_id').value = usuarioId;
    }
}
