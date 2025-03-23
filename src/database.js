const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./livros.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message);
    }
});

// Criando a tabela de livros se não existir
db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    ano_publicacao INTEGER NOT NULL,
    genero TEXT,
    paginas INTEGER NOT NULL,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
    avaliacao FLOAT)`,
    (err) => {
        if (err) {
            console.error('Erro ao criar a tabela', err.message);
        }
    });

module.exports = db;
