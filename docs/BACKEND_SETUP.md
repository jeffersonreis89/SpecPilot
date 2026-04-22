# 🚀 Guia de Setup - TestAI Backend

## Pré-requisitos

- Node.js 18+ 
- PostgreSQL 13+
- npm ou yarn

## Instalação

### 1. Clonar e entrar no diretório

```bash
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com suas credenciais PostgreSQL
```

### 4. Criar banco de dados

```bash
# No PostgreSQL
createdb testaix
```

### 5. Rodar migrations (se houver)

```bash
# Será automático ao iniciar em development
```

### 6. Iniciar servidor

**Development com hot reload:**
```bash
npm run start:dev
```

**Production:**
```bash
npm run build
npm run start:prod
```

## Endpoints Principais

### Auth
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil (requer auth)

### Collections
- `GET /api/collections` - Listar collections
- `POST /api/collections` - Criar collection
- `GET /api/collections/:id` - Obter collection específica
- `PATCH /api/collections/:id` - Atualizar collection
- `DELETE /api/collections/:id` - Deletar collection

### Test Executions
- `POST /api/test-executions/execute` - Executar testes
- `GET /api/test-executions/history/:collectionId` - Histórico de testes
- `GET /api/test-executions/stats/:collectionId` - Estatísticas

## Swagger Docs

Após iniciar o servidor, acesse:
```
http://localhost:3001/api/docs
```

## Estrutura do Projeto

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── collections/
│   │   └── test-executions/
│   ├── config/
│   ├── common/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── dist/
├── package.json
└── tsconfig.json
```

## Troubleshooting

### Erro de conexão com PostgreSQL
- Verifique se PostgreSQL está rodando
- Verifique credenciais em `.env`
- Certifique-se que o banco `testaix` existe

### Módulos não encontrados
```bash
rm -rf node_modules
npm install
```

### Porta já em uso
```bash
# Altere PORT em .env
PORT=3002
```
