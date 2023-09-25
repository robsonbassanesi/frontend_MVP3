# **CRM DTD**

O **CRM door to door** é destinado a vendedoras informais que trabalham vendendo itens em grandes centros, porém sem grande controle administrativo sobre suas vendas. O MVP consiste em uma tela de login onde é possível realizar o cadastro utilizando a conta de e-mail ou Github e ter acesso ao painel de vendas para registro das vendas que é exibido em tela.

O desenvolvimento do frontend foi feito utilizando as bibliotecas React através do **VITE**. O consumo das API’s é feito utilizando **axios**.

Para iniciar em ambiente local digite os comandos abaixo:

```shell
npm install
npm run dev
```

Para iniciar utilizando Docker digite os comandos abaixo:

```shell
docker build -t frontend .
```

E então digite:

```shell
docker run -p 3000:3000 frontend
```

Observe que em ambos os códigos o nome da imagem deve ser "frontend".

Também no frontend foi feita a implementação de uma API aberta que apresenta a cotação do dólar, com atualizações a cada 30 segundos. A documentação dessa API pode ser acessada através do link abaixo.

https://docs.awesomeapi.com.br/api-de-moedas
