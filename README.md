# jwt-authentication-node-firebase

API de autenticação segura com Node.js, Typescript, Express, JWT, CSRF, Controle de Permissões, Sequelize e integração com Firebase.

---

## Índice

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Permissões e Controle de Acesso](#permissões-e-controle-de-acesso)
- [Testes](#testes)
- [Licença](#licença)

---

## Descrição

Este projeto é uma API RESTful para autenticação e autorização de usuários, com integração ao Firebase para autenticação, uso de JWT para sessões, proteção CSRF, controle de permissões por módulo, e persistência de dados em MySQL via Sequelize ORM.

---

## Funcionalidades

- Cadastro e autenticação de usuários via Firebase
- Geração e validação de tokens de sessão (JWT/Firebase)
- Proteção contra CSRF
- Controle de permissões por módulo e ação (leitura, escrita, exclusão)
- Rotas protegidas por autenticação e autorização
- Integração com banco de dados MySQL usando Sequelize
- Estrutura modular e escalável

---

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- MySQL
- Firebase Auth & Firebase Admin SDK
- JWT (via Firebase)
- CSRF (csurf)
- dotenv
- cookie-parser
- cors

---

## Estrutura do Projeto

```
api/
  .env
  package.json
  tsconfig.json
  src/
    app.ts
    server.ts
    config/
      config.ts
      dbConfig.ts
      Firebase/
    controllers/
      auth/
      user/
    interfaces/
      auth/
      user/
    middlewares/
    models/
      user/
    routes/
    services/
    tests/
    types/
```

- **config/**: Configurações de ambiente, banco de dados e Firebase.
- **controllers/**: Lógica das rotas (Auth, User, Permission).
- **interfaces/**: Tipagens TypeScript para entidades e serviços.
- **middlewares/**: Middlewares de autenticação, autorização, CSRF, etc.
- **models/**: Modelos Sequelize para User, Permission, Module.
- **routes/**: Definição das rotas da API.
- **services/**: Lógica de negócio e integração com modelos.
- **tests/**: Scripts de teste para models e associações.
- **types/**: Tipagens globais para Express.

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do diretório `api/` com as seguintes variáveis:

```env
PORT=3000
NODE_ENV=development

# MySQL
MYSQL_DATABASE=seu_banco
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_HOST=localhost

# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

# Firebase Admin
# Salve o arquivo de credenciais do Firebase Admin como src/config/Firebase/firebaseCredentials.json
```

---

## Como Rodar o Projeto

1. Instale as dependências:

```sh
cd api
npm install
```

2. Compile o projeto:

```sh
npm run build
```

3. Inicie o servidor em modo desenvolvimento:

```sh
npm run dev
```

Ou em modo produção:

```sh
npm start
```

A API estará disponível em `http://localhost:3000` (ou porta definida no `.env`).

---

## Endpoints da API

### Autenticação

- `POST /api/auth/sign-in`  
  **Body:** `{ "user": "email", "password": "senha" }`  
  **Descrição:** Realiza login e retorna cookie de sessão.

- `POST /api/auth/sign-out`  
  **Descrição:** Realiza logout e invalida o cookie de sessão.

- `POST /api/auth/register`  
  **Body:** `{ "email": "email", "password": "senha" }`  
  **Descrição:** Cria um novo usuário no Firebase e no banco local.

### CSRF

- `GET /api/csrf-token`  
  **Descrição:** Retorna token CSRF para uso em requisições protegidas.

### Usuários

- `GET /api/user/`  
  **Descrição:** Lista todos os usuários (requer permissão de leitura).

- `GET /api/user/:id`  
  **Descrição:** Busca usuário por ID.

- `GET /api/user/email/:email`  
  **Descrição:** Busca usuário por e-mail.

- `GET /api/user/uid/:uid`  
  **Descrição:** Busca usuário por UID do Firebase.

- `POST /api/user/`  
  **Descrição:** Cria um novo usuário (requer permissão de escrita).

- `PATCH /api/user/:id`  
  **Descrição:** Atualiza dados do usuário.

- `PATCH /api/user/desactive/:id`  
  **Descrição:** Desativa usuário.

- `PATCH /api/user/reactivate/:id`  
  **Descrição:** Reativa usuário.

### Permissões

- `GET /api/permission/user/:id`  
  **Descrição:** Lista permissões de um usuário.

- `GET /api/permission/module/:id`  
  **Descrição:** Lista permissões de um módulo.

- `POST /api/permission/`  
  **Descrição:** Cria permissão.

- `PATCH /api/permission/`  
  **Descrição:** Atualiza permissão.

---

## Permissões e Controle de Acesso

O controle de acesso é feito por módulo e tipo de ação (`can_read`, `can_write`, `can_delete`).  
O middleware [`AuthorizeAccess`](api/src/middlewares/authorizeAccessMiddleware.ts) verifica se o usuário tem permissão para acessar determinada rota.

Exemplo de uso em rota:

```ts
userRouter.get("/", AuthorizeAccess(1, "can_read"), Controller.getAllUsers);
```

As permissões são carregadas no middleware [`permissionMiddleware`](api/src/middlewares/permissionMiddleware.ts) após autenticação.

---

## Testes

Os testes de models e associações estão em [src/tests/](api/src/tests/).  
Para rodar um teste, execute o arquivo correspondente com `ts-node`:

```sh
npx ts-node src/tests/user/testUserModel.ts
npx ts-node src/tests/user/testPermissionModel.ts
npx ts-node src/tests/user/testModuleModel.ts
```

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
