const sqlite3 = require('sqlite3').verbose(); // Importa o módulo sqlite3 e ativa o modo verbose, que fornece logs mais detalhados sobre o funcionamento do banco de dados.

const db = new sqlite3.Database('./livros.db', (err) => { // Cria uma nova instância do banco de dados, especificando o caminho para o arquivo "livros.db".
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message); // Se houver um erro na conexão, exibe uma mensagem de erro.
    }
});

// Cria a tabela de livros se não existir
db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    autor TEXT NOT NULL, 
    ano_publicacao INTEGER NOT NULL, 
    genero TEXT, 
    paginas INTEGER NOT NULL, 
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
    avaliacao FLOAT)`, // Define a coluna "avaliacao" como tipo float (opcional).
    (err) => {
        if (err) {
            console.error('Erro ao criar a tabela', err.message); // Caso ocorra um erro na criação da tabela, exibe uma mensagem de erro.
        }
    });

module.exports = db; // Exporta o objeto de banco de dados para que possa ser utilizado em outros arquivos.
