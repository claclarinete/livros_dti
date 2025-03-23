# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta necessária (caso necessário, CLI não usa)
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["node", "src/cli.js"]
