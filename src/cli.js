const readline = require('readline');
const { create, getById, getByAuthor, getAll, update, remove } = require('./livrosController');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    
    console.log('\n--- Gerenciador de Livros ---');
    console.log('1. Listar livros');
    console.log('2. Adicionar livro');
    console.log('3. Buscar livro por ID');
    console.log('4. Buscar livro por autor');
    console.log('5. Atualizar livro');
    console.log('6. Deletar livro');
    console.log('7. Sair');

    rl.question('Escolha uma opção: ', async (opcao) => {
        switch (opcao) {
            case '1':
                const livros = await getAll();
                console.table(livros);
                menu();
                break;

            case '2':
                rl.question('Título: ', (titulo) => {
                    rl.question('Autor: ', (autor) => {
                        rl.question('Ano de publicação: ', (ano) => {
                            rl.question('Gênero: ', (genero) => {
                                rl.question('Número de páginas: ', (paginas) => {
                                    rl.question('Avaliação (0.0 - 5.0): ', (avaliacao) => {
                                        // Verificações de validação dos dados
                                        const ano_atual = new Date().getFullYear();
                                        if (!titulo || typeof titulo !== 'string') {
                                            console.error("\nTítulo inválido");
                                            return menu();
                                        }
                                        if (!autor || typeof autor !== 'string') {
                                            console.error("\nAutor inválido");
                                            return menu();
                                        }
                                        if (!ano || isNaN(ano) || ano < 0 || ano > ano_atual) {
                                            console.error("\nAno de publicação inválido");
                                            return menu();
                                        }
                                        if (!paginas || isNaN(paginas) || paginas <= 0) {
                                            console.error("\nNúmero de páginas inválido");
                                            return menu();
                                        }
                                        if (avaliacao !== undefined && (isNaN(avaliacao) || avaliacao < 0.0 || avaliacao > 5.0)) {
                                            console.error("\nAvaliação deve estar entre 0.0 e 5.0");
                                            return menu();
                                        }

                                        // Se todas as verificações passarem, chama a função `create`
                                        create(titulo, autor, parseInt(ano), genero, parseInt(paginas), parseFloat(avaliacao))
                                            .then(() => console.log('\nLivro adicionado com sucesso!'))
                                            .catch((err) => console.error('\nErro ao adicionar livro:', err))
                                            .finally(() => menu());
                                    });
                                });
                            });
                        });
                    });
                });
                break;

            case '3':
                rl.question('Digite o ID do livro: ', async (id) => {
                    const livro = await getById(parseInt(id));
                    if (livro) {
                        console.table(livro);
                    } else {
                        console.error('\nLivro não encontrado.');
                    }
                    menu();
                });
                break;
            
            case '4':
                rl.question('Digite o autor desejado: ', async(autor) => {
                    const livros = await getByAuthor(autor);
                    if (livros) {
                        console.table(livros);
                    } else {
                        console.error('\nNenhum livro encontrado.');
                    }
                    menu();
                });
                break;
            
            case '5':
                rl.question('Digite o ID do livro a ser atualizado: ', async (id) => {
                    // Verifica se o ID é válido
                    if (isNaN(id) || parseInt(id) <= 0) {
                        console.error("\nID inválido");
                        return menu();
                    }

                    try {
                        // Verificação se o livro existe no banco de dados
                        const livro = await getById(parseInt(id)); // Função que busca o livro pelo ID
                        if (!livro) {
                            console.error("\nLivro não encontrado");
                            return menu();
                        }

                        // Caso o livro exista, continue com a solicitação dos novos dados
                        rl.question('Novo título: ', (titulo) => {
                            rl.question('Novo autor: ', (autor) => {
                                rl.question('Novo ano de publicação: ', (ano) => {
                                    rl.question('Novo gênero: ', (genero) => {
                                        rl.question('Novo número de páginas: ', (paginas) => {
                                            rl.question('Nova avaliação (0.0 - 5.0): ', (avaliacao) => {
                                                // Verificações de validação dos dados
                                                const ano_atual = new Date().getFullYear();
                                                if (!titulo || typeof titulo !== 'string') {
                                                    console.error("\nTítulo inválido");
                                                    return menu();
                                                }
                                                if (!autor || typeof autor !== 'string') {
                                                    console.error("\nAutor inválido");
                                                    return menu();
                                                }
                                                if (!ano || isNaN(ano) || ano < 0 || ano > ano_atual) {
                                                    console.error("\nAno de publicação inválido");
                                                    return menu();
                                                }
                                                if (!paginas || isNaN(paginas) || paginas <= 0) {
                                                    console.error("\nNúmero de páginas inválido");
                                                    return menu();
                                                }
                                                if (avaliacao !== undefined && (isNaN(avaliacao) || avaliacao < 0.0 || avaliacao > 5.0)) {
                                                    console.error("\nAvaliação deve estar entre 0.0 e 5.0");
                                                    return menu();
                                                }

                                                // Atualizar o livro no banco de dados
                                                update(parseInt(id), titulo, autor, parseInt(ano), genero, parseInt(paginas), parseFloat(avaliacao))
                                                    .then(() => console.log('\nLivro atualizado com sucesso!'))
                                                    .catch((err) => console.error('\nErro ao atualizar livro:', err))
                                                    .finally(() => menu());
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    } catch (err) {
                        console.error('\nErro ao verificar livro:', err);
                        menu();
                    }
                });
                break;

            case '6':
                rl.question('Digite o ID do livro a ser deletado: ', async (id) => {
                    // Verifica se o ID é válido
                    if (isNaN(id) || parseInt(id) <= 0) {
                        console.error("\nID inválido");
                        return menu();
                    }

                    try {
                        // Verificação se o livro existe no banco de dados
                        const livro = await getById(parseInt(id)); // Função que busca o livro pelo ID
                        if (!livro) {
                            console.error("\nLivro não encontrado");
                            return menu();
                        }

                        // Caso o livro exista, remover o livro
                        remove(parseInt(id))
                            .then(() => console.log('\nLivro removido com sucesso!'))
                            .catch((err) => console.error('\nErro ao remover livro:', err))
                            .finally(() => menu());
                    } catch (err) {
                        console.error('\nErro ao verificar livro:', err);
                        menu();
                    }
                });
                break;

            case '7':
                rl.close();
                break;

            default:
                console.log('\nOpção inválida!');
                menu();
        }
    });
}

menu();
