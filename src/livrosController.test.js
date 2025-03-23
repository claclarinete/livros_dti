const livrosController = require('./livrosController'); // Importa o módulo de controle dos livros.
const db = require('./database'); // Importa o módulo de banco de dados para mockar as interações com o banco.

jest.mock('./database', () => ({ // Faz o mock das funções de banco de dados para simular interações durante os testes.
    run: jest.fn(), // Mock da função 'run' para simular a execução de comandos no banco de dados.
    get: jest.fn(), // Mock da função 'get' para simular a busca de um único registro no banco.
    all: jest.fn() // Mock da função 'all' para simular a busca de múltiplos registros no banco.
}));

describe('livrosController', () => { // Inicia o bloco de testes para o módulo livrosController.

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste para garantir que não haja interferência entre os testes.
    });

    test('create - deve inserir um livro e retornar o ID', async () => { // Teste para verificar a criação de um livro.
        db.run.mockImplementation((query, params, callback) => callback(null)); // Simula o sucesso da execução do comando INSERT.
        const result = await livrosController.create('Livro Teste', 'Autor Teste', 2024, 'Ficção', 300, 4.5); // Chama o método create.
        expect(result).toHaveProperty('id'); // Verifica se o resultado contém a propriedade 'id'.
    });

    test('create - deve rejeitar em caso de erro', async () => { // Teste para verificar o comportamento do create em caso de erro.
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao inserir'))); // Simula um erro ao inserir.
        await expect(livrosController.create('Livro Teste', 'Autor Teste', 2024, 'Ficção', 300, 4.5)) // Verifica se o erro é lançado.
            .rejects.toThrow('Erro ao inserir');
    });

    test('getById - deve retornar um livro pelo ID', async () => { // Teste para verificar a busca de um livro pelo ID.
        const mockLivro = { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste' }; // Criação de um mock de livro.
        db.get.mockImplementation((query, params, callback) => callback(null, mockLivro)); // Simula a resposta da busca no banco.
        await expect(livrosController.getById(1)).resolves.toEqual(mockLivro); // Verifica se o livro retornado é o mock criado.
    });

    test('getById - deve rejeitar caso ocorra um erro', async () => { // Teste para verificar o comportamento ao buscar um livro pelo ID em caso de erro.
        db.get.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar'))); // Simula um erro ao buscar.
        await expect(livrosController.getById(1)).rejects.toThrow('Erro ao buscar'); // Verifica se o erro é lançado.
    });

    test('getByAuthor - deve retornar uma lista de livros pelo autor', async () => { // Teste para verificar a busca de livros por autor.
        const mockLivros = [ // Mock de uma lista de livros.
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 2, titulo: 'Livro 2', autor: 'Autor 2' },
            { id: 3, titulo: 'Livro 3', autor: 'Autor 1' }
        ];
        db.all.mockImplementation((query, params, callback) => { // Simula a busca de livros filtrando pelo autor.
            const livrosFiltrados = mockLivros.filter(livro => livro.autor === params[0]);
            callback(null, livrosFiltrados); // Retorna os livros filtrados.
        });
        await expect(livrosController.getByAuthor('Autor 1')).resolves.toEqual([ // Verifica se os livros retornados são os esperados.
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 3, titulo: 'Livro 3', autor: 'Autor 1' }
        ]);
    });

    test('getByAuthor - deve rejeitar caso ocorra um erro', async () => { // Teste para verificar o comportamento em caso de erro ao buscar livros por autor.
        db.all.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar'))); // Simula um erro na busca.
        await expect(livrosController.getAll()).rejects.toThrow('Erro ao buscar'); // Verifica se o erro é lançado.
    });

    test('getAll - deve retornar a lista de livros', async () => { // Teste para verificar se a função de obter todos os livros retorna a lista correta.
        const mockLivros = [ // Mock da lista de livros.
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 2, titulo: 'Livro 2', autor: 'Autor 2' }
        ];
        db.all.mockImplementation((query, params, callback) => callback(null, mockLivros)); // Simula a resposta de todos os livros.
        await expect(livrosController.getAll()).resolves.toEqual(mockLivros); // Verifica se a lista retornada é a esperada.
    });

    test('getAll - deve rejeitar em caso de erro', async () => { // Teste para verificar o comportamento em caso de erro ao obter todos os livros.
        db.all.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar'))); // Simula um erro ao buscar os livros.
        await expect(livrosController.getAll()).rejects.toThrow('Erro ao buscar'); // Verifica se o erro é lançado.
    });

    test('update - deve atualizar um livro e retornar mudanças', async () => { // Teste para verificar a atualização de um livro.
        db.run.mockImplementation((query, params, callback) => callback(null)); // Simula a execução bem-sucedida do comando UPDATE.
        const result = await livrosController.update(1, 'Novo Título', 'Novo Autor', 2025, 'Romance', 250, 5.0); // Chama o método update.
        expect(result).toHaveProperty('changes'); // Verifica se o resultado contém a propriedade 'changes', indicando alterações feitas.
    });

    test('update - deve rejeitar em caso de erro', async () => { // Teste para verificar o comportamento ao tentar atualizar um livro em caso de erro.
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao atualizar'))); // Simula um erro ao tentar atualizar.
        await expect(livrosController.update(1, 'Novo Título', 'Novo Autor', 2025, 'Romance', 250, 5.0)) // Verifica se o erro é lançado.
            .rejects.toThrow('Erro ao atualizar');
    });

    test('remove - deve remover um livro e retornar mudanças', async () => { // Teste para verificar a remoção de um livro.
        db.run.mockImplementation((query, params, callback) => callback(null)); // Simula a execução bem-sucedida do comando DELETE.
        const result = await livrosController.remove(1); // Chama o método remove.
        expect(result).toHaveProperty('changes'); // Verifica se o resultado contém a propriedade 'changes', indicando que mudanças ocorreram.
    });

    test('remove - deve rejeitar em caso de erro', async () => { // Teste para verificar o comportamento ao tentar remover um livro em caso de erro.
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao remover'))); // Simula um erro ao tentar remover.
        await expect(livrosController.remove(1)).rejects.toThrow('Erro ao remover'); // Verifica se o erro é lançado.
    });
});
