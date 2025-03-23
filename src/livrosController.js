const db = require('./database')

async function create(titulo, autor, ano_publicacao, genero, paginas, avaliacao) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO livros (titulo, autor, ano_publicacao, genero, paginas, avaliacao) VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo, autor, ano_publicacao, genero, paginas, avaliacao],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            }
        );
    });
}

async function getById(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM livros WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

async function getAll() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM livros', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

async function update(id, titulo, autor, ano_publicacao, genero, paginas, avaliacao) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE livros SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?, paginas = ?, avaliacao = ? WHERE id = ?',
            [titulo, autor, ano_publicacao, genero, paginas, avaliacao, id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
}

async function remove(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM livros WHERE id = ?', [id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
}

module.exports = { create, getById, getAll, update, remove };
