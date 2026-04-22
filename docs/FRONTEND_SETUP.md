# 🚀 Guia de Setup - TestAI Frontend

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Instalação

### 1. Entrar no diretório

```bash
cd frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com a URL do backend (padrão: http://localhost:3001)
```

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 5. Build para produção

```bash
npm run build
npm run preview
```

## Stack

- **React 18**
- **TypeScript**
- **Vite** (build tool)
- **Zustand** (state management)
- **Axios** (HTTP client)
- **React Router** (routing)
- **Tailwind CSS** (styling)

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   └── TestResultsPage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── stores/
│   │   └── authStore.ts
│   ├── components/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Pages

### LoginPage
- Autenticação de usuários existentes
- Redirecionamento para RegisterPage

### RegisterPage
- Criar nova conta
- Validação de email e senha

### DashboardPage
- Listar todas as collections
- Executar testes
- Ver histórico

### CollectionsPage
- Upload de arquivo Postman Collection
- Criar nova collection

### TestResultsPage
- Visualizar resultados dos testes
- Estatísticas (total, passou, falhou, erro)
- Tabela com detalhes de cada requisição

## Troubleshooting

### API não está respondendo
- Certifique-se que o backend está rodando em http://localhost:3001
- Verifique `.env` e a variável `VITE_API_URL`

### Módulos não encontrados
```bash
rm -rf node_modules
npm install
```

### Porta 3000 já em uso
```bash
# No vite.config.ts, altere a porta
server: {
  port: 3001,
}
```

## Lint e Format

```bash
# Lint
npm run lint

# Format (Prettier)
npm run format
```
