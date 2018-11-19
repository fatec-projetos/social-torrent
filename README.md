# Social Torrent

Social Torrent é um projeto desenvolvido para a aula do professor Thiago Collebrusco da Fatec de São José do Rio Preto. O objetivo desse projeto é criar uma mini rede onde usuários podem compartilhar link's magnéticos de torrent e comentar sobre eles. Tudo isso sem visar lucro ou algo do tipo. O projeto não contém propagandas, nem preço para uso.

# Tecnologias utilizadas
  - BackEnd em NodeJS
  - SGDB MySQL
  - FrontEnd JavaScript utilizando os frameworks (AngularJS + Bootstrap + Font-awesome)

# Funcionalidades

  - Opção de cadastro
  - Autenticação
  - Cadastro de Magnet's
  - Comentar e remover seus comentários em qualquer magnet
  - Classificar um magnet
  - Abrir o magnet diretamente no cliente torrent desejado

# Executando o projeto

1. Para executar o projeto basta importar o arquivo banco-de-dados.sql em sua base de dados MySQL ou MariaDB.
2. Após importar, crie um usuário com os direitos necessários e informe as credênciais do mesmo no arquivo .env.
3. Em seu .ENV defina a porta HTTP que será utilizado para rodar o projeto.
4. Execute o comando `npm install` para instalar as dependências do projeto.
5. Após instalar digite o comando `npm start`, abra o browser no endereço `http://localhost:PORTA_DO_ENV`

Pronto seguindo os passos acima o projeto vai ser executado e ficar disponível para uso.

# Notas de Desenvolvimento
Para assinar as chaves foi feito uso do JWT e a chave para assinar os tokens não é configurável. Ao digitar o comando `npm start` ele vai gerar uma chave aleatória fazendo uso da biblioteca `uuid` ou seja, caso você pare a execução e inicie novamente todos os usuários conectados vão ter que logar novamente.

# Autor
- Hiago Silva Souza <<hiasilva@gmail.com>>

# Licença
MIT