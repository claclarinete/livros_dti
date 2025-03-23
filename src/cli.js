const readline = require('readline'); // Importa o módulo readline para interação com o usuário via terminal.
const chalk = require('chalk'); //Importa o módulo chalk para alterar as cores do output.
const { create, getById, getByAuthor, getAll, update, remove } = require('./livrosController'); // Desestruturação para importar funções de um controller que manipula livros.

const rl = readline.createInterface({ // Cria uma interface de leitura com o terminal.
    input: process.stdin, // Entrada de dados do terminal.
    output: process.stdout // Saída para o terminal.
});

function menu() { // Função que exibe o menu principal de opções para o usuário.

    console.log(chalk.bold('\n--- Gerenciador de Livros ---')); // Exibe o título do menu e as opções.
    console.log('1. Listar livros'); 
    console.log('2. Adicionar livro'); 
    console.log('3. Buscar livro por ID'); 
    console.log('4. Buscar livro por autor'); 
    console.log('5. Atualizar livro'); 
    console.log('6. Deletar livro'); 
    console.log('7. Sair'); 

    rl.question('Escolha uma opção: ', async (opcao) => { // Pergunta ao usuário qual opção deseja escolher.
        switch (opcao) { // Verifica a opção escolhida.
            case '1': // Caso 1: Listar livros.
                const livros = await getAll(); // Chama a função `getAll` para obter todos os livros.
                console.table(livros); // Exibe os livros em formato de tabela.
                menu(); // Chama novamente o menu após a ação.
                break;

            case '2': // Caso 2: Adicionar um livro.
                rl.question('Título: ', (titulo) => { // Pergunta o título do livro.
                    rl.question('Autor: ', (autor) => { // Pergunta o autor do livro.
                        rl.question('Ano de publicação: ', (ano) => { // Pergunta o ano de publicação.
                            rl.question('Gênero: ', (genero) => { // Pergunta o gênero do livro.
                                rl.question('Número de páginas: ', (paginas) => { // Pergunta o número de páginas.
                                    rl.question('Avaliação (0.0 - 5.0): ', (avaliacao) => { // Pergunta a avaliação do livro.

                                        // Valida as entradas do usuário.
                                        const ano_atual = new Date().getFullYear();
                                        if (!titulo || typeof titulo !== 'string') {
                                            console.error(chalk.red.bold('\nTítulo inválido!'));
                                            return menu();
                                        }
                                        if (!autor || typeof autor !== 'string') {
                                            console.error(chalk.red.bold('\nAutor inválido!'));
                                            return menu();
                                        }
                                        if (!ano || isNaN(ano) || ano < 0 || ano > ano_atual) {
                                            console.error(chalk.red.bold('\nAno de publicação inválido!'));
                                            return menu();
                                        }
                                        if (!paginas || isNaN(paginas) || paginas <= 0) {
                                            console.error(chalk.red.bold('\nNúmero de páginas inválido!'));
                                            return menu();
                                        }
                                        if (avaliacao !== undefined && (isNaN(avaliacao) || avaliacao < 0.0 || avaliacao > 5.0)) {
                                            console.error(chalk.red.bold('\nAvaliação deve estar entre 0.0 e 5.0!'));
                                            return menu();
                                        }

                                        // Se todas as validações passarem, chama a função `create` para adicionar o livro ao banco de dados.
                                        create(titulo, autor, parseInt(ano), genero, parseInt(paginas), parseFloat(avaliacao))
                                            .then(() => console.log(chalk.green.bold('\nLivro adicionado com sucesso!')))
                                            .catch((err) => console.error(chalk.red.bold('\nErro ao adicionar livro:', err)))
                                            .finally(() => menu()); // Chama o menu novamente após a operação.
                                    });
                                });
                            });
                        });
                    });
                });
                break;

            case '3': // Caso 3: Buscar livro por ID.
                rl.question('Digite o ID do livro: ', async (id) => { // Pergunta o ID do livro.
                    const livro = await getById(parseInt(id)); // Chama a função `getById` para buscar o livro pelo ID.
                    if (livro) {
                        console.table(livro); // Exibe o livro encontrado.
                    } else {
                        console.error(chalk.red.bold('\nLivro não encontrado.')); // Caso o livro não seja encontrado, exibe erro.
                    }
                    menu(); // Chama o menu novamente após a operação.
                });
                break;

            case '4': // Caso 4: Buscar livro por autor.
                rl.question('Digite o autor desejado: ', async (autor) => { // Pergunta o autor.
                    const livros = await getByAuthor(autor); // Chama a função `getByAuthor` para buscar os livros pelo autor.
                    if (livros) {
                        console.table(livros); // Exibe os livros encontrados.
                    } else {
                        console.error(chalk.red.bold('\nNenhum livro encontrado.')); // Caso nenhum livro seja encontrado, exibe erro.
                    }
                    menu(); // Chama o menu novamente após a operação.
                });
                break;

            case '5': // Caso 5: Atualizar livro.
                rl.question('Digite o ID do livro a ser atualizado: ', async (id) => { // Pergunta o ID do livro a ser atualizado.
                    if (isNaN(id) || parseInt(id) <= 0) {
                        console.error(chalk.red.bold("\nID inválido"));
                        return menu(); // Valida o ID.
                    }

                    try {
                        const livro = await getById(parseInt(id)); // Busca o livro pelo ID.
                        if (!livro) {
                            console.error(chalk.red.bold("\nLivro não encontrado"));
                            return menu(); // Caso o livro não seja encontrado, exibe erro.
                        }

                        // Solicita novos dados para atualização do livro.
                        rl.question('Novo título: ', (titulo) => {
                            rl.question('Novo autor: ', (autor) => {
                                rl.question('Novo ano de publicação: ', (ano) => {
                                    rl.question('Novo gênero: ', (genero) => {
                                        rl.question('Novo número de páginas: ', (paginas) => {
                                            rl.question('Nova avaliação (0.0 - 5.0): ', (avaliacao) => {

                                                // Valida as entradas do usuário.
                                                const ano_atual = new Date().getFullYear();
                                                if (!titulo || typeof titulo !== 'string') {
                                                    console.error(chalk.red.bold('\nTítulo inválido!'));
                                                    return menu();
                                                }
                                                if (!autor || typeof autor !== 'string') {
                                                    console.error(chalk.red.bold('\nAutor inválido!'));
                                                    return menu();
                                                }
                                                if (!ano || isNaN(ano) || ano < 0 || ano > ano_atual) {
                                                    console.error(chalk.red.bold('\nAno de publicação inválido!'));
                                                    return menu();
                                                }
                                                if (!paginas || isNaN(paginas) || paginas <= 0) {
                                                    console.error(chalk.red.bold('\nNúmero de páginas inválido!'));
                                                    return menu();
                                                }
                                                if (avaliacao !== undefined && (isNaN(avaliacao) || avaliacao < 0.0 || avaliacao > 5.0)) {
                                                    console.error(chalk.red.bold('\nAvaliação deve estar entre 0.0 e 5.0!'));
                                                    return menu();
                                                }

                                                // Atualiza o livro no banco de dados.
                                                update(parseInt(id), titulo, autor, parseInt(ano), genero, parseInt(paginas), parseFloat(avaliacao))
                                                    .then(() => console.log(chalk.green.bold('\nLivro atualizado com sucesso!')))
                                                    .catch((err) => console.error(chalk.red.bold('\nErro ao atualizar livro:', err)))
                                                    .finally(() => menu()); // Chama o menu novamente após a operação.
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    } catch (err) {
                        console.error(chalk.red.bold('\nErro ao verificar livro:', err)); // Caso haja erro na busca do livro, exibe erro.
                        menu(); // Chama o menu novamente após o erro.
                    }
                });
                break;

            case '6': // Caso 6: Deletar livro.
                rl.question('Digite o ID do livro a ser deletado: ', async (id) => { // Pergunta o ID do livro a ser deletado.
                    if (isNaN(id) || parseInt(id) <= 0) {
                        console.error(chalk.red.bold("\nID inválido"));
                        return menu(); // Valida o ID.
                    }

                    try {
                        const livro = await getById(parseInt(id)); // Verifica se o livro existe.
                        if (!livro) {
                            console.error(chalk.red.bold("\nLivro não encontrado"));
                            return menu(); // Caso o livro não seja encontrado, exibe erro.
                        }

                        // Deleta o livro do banco de dados.
                        remove(parseInt(id))
                            .then(() => console.log(chalk.green.bold('\nLivro removido com sucesso!')))
                            .catch((err) => console.error(chalk.red.bold('\nErro ao remover livro:', err)))
                            .finally(() => menu()); // Chama o menu novamente após a operação.
                    } catch (err) {
                        console.error(chalk.red.bold('\nErro ao verificar livro:', err)); // Caso ocorra um erro ao verificar o livro, exibe erro.
                        menu(); // Chama o menu novamente após o erro.
                    }
                });
                break;

            case '7': // Caso 7: Sair do programa.
                rl.close(); // Fecha a interface de leitura do terminal.
                break;

            default: // Caso a opção fornecida seja inválida.
                console.log(chalk.red.bold('\nOpção inválida!'));
                menu(); // Chama o menu novamente após um erro.
        }
    });
}

menu(); // Chama a função menu para iniciar o programa.
