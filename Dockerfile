# Use uma imagem base adequada para Node.js
FROM node:alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /frontend

# Copie o arquivo de manifesto de pacotes e instale as dependências
COPY package*.json ./

# RUN npm cache clean --force

RUN npm install

# Copie os arquivos do código-fonte para o contêiner
COPY . .

# Defina a pasta de build como pasta de conteúdo estático
EXPOSE 3000
CMD ["npm", "run", "dev"]
