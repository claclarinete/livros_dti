const db = require('./database'); // Importa o módulo de banco de dados SQLite.

async function create(titulo, autor, ano_publicacao, genero, paginas, avaliacao) {
    return new Promise((resolve, reject) => {
        // Executa a consulta de inserção no banco de dados para adicionar um novo livro.
        db.run(`INSERT INTO livros (titulo, autor, ano_publicacao, genero, paginas, avaliacao) VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo, autor, ano_publicacao, genero, paginas, avaliacao], // Passa os valores do livro para a query.
            function (err) {
                if (err) {
                    reject(err); // Se ocorrer erro, rejeita a promise.
                } else {
                    resolve({ id: this.lastID }); // Se bem-sucedido, resolve com o ID do último livro inserido.
                }
            }
        );
    });
}

async function getById(id) {
    return new Promise((resolve, reject) => {
        // Executa uma consulta para buscar um livro pelo seu ID.
        db.get('SELECT * FROM livros WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err); // Se ocorrer erro, rejeita a promise.
            } else {
                resolve(row); // Se bem-sucedido, resolve com a linha (livro) encontrada.
            }
        });
    });
}

async function getByAuthor(autor) {
    return new Promise((resolve, reject) => {
        // Executa uma consulta para buscar livros por autor.
        db.all('SELECT * FROM livros WHERE autor = ?', [autor], (err, rows) => {
            if (err) {
                reject(err); // Se ocorrer erro, rejeita a promise.
            } else {
                resolve(rows); // Se bem-sucedido, resolve com as linhas (livros) encontradas.
            }
        });
    });
}

async function getAll() {
    return new Promise((resolve, reject) => {
        // Executa uma consulta para buscar todos os livros.
        db.all('SELECT * FROM livros', [], (err, rows) => {
            if (err) {
                reject(err); // Se ocorrer erro, rejeita a promise.
            } else {
                resolve(rows); // Se bem-sucedido, resolve com todas as linhas (livros) encontradas.
            }
        });
    });
}

async function update(id, titulo, autor, ano_publicacao, genero, paginas, avaliacao) {
    return new Promise((resolve, reject) => {
        // Executa uma consulta para atualizar os dados de um livro específico.
        db.run('UPDATE livros SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?, paginas = ?, avaliacao = ? WHERE id = ?',
            [titulo, autor, ano_publicacao, genero, paginas, avaliacao, id], // Passa os valores a serem atualizados.
            function (err) {
                if (err) {
                    reject(err); // Se ocorrer erro, rejeita a promise.
                } else {
                    resolve({ changes: this.changes }); // Se bem-sucedido, resolve com o número de linhas alteradas.
                }
            }
        );
    });
}

async function remove(id) {
    return new Promise((resolve, reject) => {
        // Executa uma consulta para deletar um livro com o ID fornecido.
        db.run('DELETE FROM livros WHERE id = ?', [id], // Passa o ID do livro a ser removido.
            function (err) {
                if (err) {
                    reject(err); // Se ocorrer erro, rejeita a promise.
                } else {
                    resolve({ changes: this.changes }); // Se bem-sucedido, resolve com o número de linhas removidas.
                }
            }
        );
    });
}

module.exports = { create, getById, getByAuthor, getAll, update, remove }; // Exporta as funções para que possam ser utilizadas em outros módulos.
