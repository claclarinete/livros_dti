const livrosController = require('./livrosController');
const db = require('./database');

jest.mock('./database', () => ({
    run: jest.fn(),
    get: jest.fn(),
    all: jest.fn()
}));

describe('livrosController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('create - deve inserir um livro e retornar o ID', async () => {
        db.run.mockImplementation((query, params, callback) => callback(null));
        const result = await livrosController.create('Livro Teste', 'Autor Teste', 2024, 'Ficção', 300, 4.5);
        expect(result).toHaveProperty('id');
    });

    test('create - deve rejeitar em caso de erro', async () => {
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao inserir')));
        await expect(livrosController.create('Livro Teste', 'Autor Teste', 2024, 'Ficção', 300, 4.5))
            .rejects.toThrow('Erro ao inserir');
    });

    test('getById - deve retornar um livro pelo ID', async () => {
        const mockLivro = { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste' };
        db.get.mockImplementation((query, params, callback) => callback(null, mockLivro));
        await expect(livrosController.getById(1)).resolves.toEqual(mockLivro);
    });

    test('getById - deve rejeitar caso ocorra um erro', async () => {
        db.get.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar')));
        await expect(livrosController.getById(1)).rejects.toThrow('Erro ao buscar');
    });

    test('getByAuthor - deve retornar uma lista de livros pelo autor', async () => {
        const mockLivros = [
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 2, titulo: 'Livro 2', autor: 'Autor 2' },
            { id: 3, titulo: 'Livro 3', autor: 'Autor 1' }
        ];
        db.all.mockImplementation((query, params, callback) => {
            const livrosFiltrados = mockLivros.filter(livro => livro.autor === params[0]);
            callback(null, livrosFiltrados);
        });
        await expect(livrosController.getByAuthor('Autor 1')).resolves.toEqual([
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 3, titulo: 'Livro 3', autor: 'Autor 1' }
        ]);
    });

    test('getByAuthor - deve rejeitar caso ocorra um erro', async () => {
        db.all.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar')));
        await expect(livrosController.getAll()).rejects.toThrow('Erro ao buscar');
    });

    test('getAll - deve retornar a lista de livros', async () => {
        const mockLivros = [
            { id: 1, titulo: 'Livro 1', autor: 'Autor 1' },
            { id: 2, titulo: 'Livro 2', autor: 'Autor 2' }
        ];
        db.all.mockImplementation((query, params, callback) => callback(null, mockLivros));
        await expect(livrosController.getAll()).resolves.toEqual(mockLivros);
    });

    test('getAll - deve rejeitar em caso de erro', async () => {
        db.all.mockImplementation((query, params, callback) => callback(new Error('Erro ao buscar')));
        await expect(livrosController.getAll()).rejects.toThrow('Erro ao buscar');
    });

    test('update - deve atualizar um livro e retornar mudanças', async () => {
        db.run.mockImplementation((query, params, callback) => callback(null));
        const result = await livrosController.update(1, 'Novo Título', 'Novo Autor', 2025, 'Romance', 250, 5.0);
        expect(result).toHaveProperty('changes');
    });

    test('update - deve rejeitar em caso de erro', async () => {
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao atualizar')));
        await expect(livrosController.update(1, 'Novo Título', 'Novo Autor', 2025, 'Romance', 250, 5.0))
            .rejects.toThrow('Erro ao atualizar');
    });

    test('remove - deve remover um livro e retornar mudanças', async () => {
        db.run.mockImplementation((query, params, callback) => callback(null));
        const result = await livrosController.remove(1);
        expect(result).toHaveProperty('changes');
    });

    test('remove - deve rejeitar em caso de erro', async () => {
        db.run.mockImplementation((query, params, callback) => callback(new Error('Erro ao remover')));
        await expect(livrosController.remove(1)).rejects.toThrow('Erro ao remover');
    });
});
