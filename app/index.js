const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurações de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'db', // Nome do serviço do MySQL no Docker Compose
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
      }
      console.log('Conectado ao MySQL!');
  const createTableQuery = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))`;
  connection.query(createTableQuery);
});

// Endpoint para retornar os nomes cadastrados e adicionar um novo
app.get('/', (req, res) => {
  const insertQuery = `INSERT INTO people(name) values('Full Cycle Rocks!')`;
  connection.query(insertQuery);

  connection.query('SELECT name FROM people', (err, results) => {
    if (err) throw err;

    let response = '<h1>Full Cycle Rocks!</h1>';
    response += '<ul>';
    results.forEach(row => {
      response += `<li>${row.name}</li>`;
    });
    response += '</ul>';

    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
