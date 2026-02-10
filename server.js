    const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL via pool (via XAMPP)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "livros",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexão inicial
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
    connection.release();
  }
});

app.post('/usuarios', (req, res) => {
  const { id, cpf, nome } = req.body;
  
  console.log('Recebido:', { id, cpf, nome });
  
  db.query('INSERT INTO usuarios (id, cpf, nome_e_sobrenome) VALUES (?, ?, ?)', [id, cpf, nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      return res.status(500).send('Erro ao cadastrar usuário: ' + err.message);
    }
    console.log('Usuário cadastrado com sucesso!');
    res.send('Usuário cadastrado com sucesso!');
  });
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar:', err);
      return res.status(500).send('Erro ao buscar usuários');
    }
    
    // Retorna HTML formatado
    let html = '<h1>Usuários Cadastrados</h1>';
    html += '<table border="1"><tr><th>ID</th><th>CPF</th><th>Nome</th></tr>';
    results.forEach(user => {
      html += `<tr><td>${user.id}</td><td>${user.cpf}</td><td>${user.nome_e_sobrenome}</td></tr>`;
    });
    html += '</table>';
    html += '<br><a href="/">Voltar ao formulário</a>';
    res.send(html);
  });
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);