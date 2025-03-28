# 📚 Gerenciador de Livros

Este projeto é uma aplicação de linha de comando (CLI) para gerenciar livros usando **Node.js** e **SQLite**. Cada livro tem título, autor, ano de publicação, gênero, páginas e nota de avaliação.

## 📌 Funcionalidades
Ao executar esse projeto, um menu será exibido no terminal indicando, de maneira intuitiva, quais funcionalidades podem ser executadas, sendo elas:

✅ **Listar livros** do banco de dados  
✅ **Adicionar um novo livro** com título, autor, ano, gênero, páginas e avaliação  
✅ **Buscar livro por ID** e exibir detalhes  
✅ **Buscar livros por autor** e exibir detalhes  
✅ **Atualizar um livro existente**  
✅ **Remover um livro** com base no ID  

## 🚀 Tecnologias Utilizadas
- Node.js
- SQLite
- readline-sync
- Jest
- Docker

## 📂 Estrutura do Projeto
```
livros_dti/
│── src/
│   ├── cli.js                      # Interface de linha de comando (menu interativo)
│   ├── database.js                 # Configuração do banco de dados SQLite
│   ├── livrosController.js         # Funções CRUD para manipulação dos livros
│   ├── livrosController.test.js    # Testes unitários das funções CRUD
|── .dockerignore                   # Arquivos a serem ignorados pelo Docker
│── .gitignore                      # Arquivos a serem ignorados pelo Git(ex: banco SQLite)
│── dockerfile                      # Arquivos com as configurações para execução do docker
│── package-lock.json               # Pacotes instalados ao rodar "npm install"
│── package.json                    # Dependências do projeto
│── README.md                       # Documentação do projeto

```

## 📥 Instalação
1. **Instale o Node.js** caso ainda não tenha.
    - Baixe e instale em: [https://nodejs.org/](https://nodejs.org/)

2. **Instale o SQLite** caso ainda não tenha.
    - Baixe e instale em: [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)

3. **Clone este repositório** (ou crie uma pasta para o projeto):
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```
4. **Instale as dependências:**
    ```sh
    npm install
    ```

## 🧪 Como Testar o Projeto
1. **Executar o Jest:**
    ```sh
    npm test
    ```

## ▶️ Como Rodar o Projeto
1. **Executar a aplicação CLI:**
    ```sh
    npm start
    ````

## 🐳 Rodando com Docker (Opcional)
Se quiser rodar dentro de um container Docker:

1. **Instale o Docker** caso ainda não tenha
    - Baixe e instale em: [https://www.docker.com](https://www.docker.com)

2. **Executar o script:**
    ```sh
    npm run docker
    ```
3. **Caso tenha problema de permissão, execute os comandos com sudo na frente:**
    ```sh
    sudo docker build -t livros_dti . 
    sudo docker run -it --rm livros_dti
    ```

## 📜 Licença
Este projeto é open-source. Sinta-se livre para usar e modificar conforme necessário!