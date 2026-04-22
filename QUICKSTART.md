# 🚀 Quick Start - TestAI

## Setup Rápido (5 minutos)

### Terminal 1-A: Backend

```bash
cd backend
cp .env.example .env

# Edite .env com suas credenciais PostgreSQL
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=testaix

npm install
npm run start:dev
```

✅ Backend rodando em `http://localhost:3001`

### Terminal 1-B: Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend rodando em `http://localhost:3002`

---

## Fluxo de Uso MVP

### 1️⃣ Registrar
- Acesse `http://localhost:3002/register`
- Crie conta

### 2️⃣ Criar Collection
- Dashboard → "+ Nova Collection"
- Upload arquivo Postman Collection (JSON)
- Adicionar Base URL

### 3️⃣ Executar Testes
- Dashboard → "Executar Testes"
- Aguarde resultados

### 4️⃣ Ver Resultados
- Tabela com status de cada request
- Estatísticas: Total, Passou, Falhou, Erro

---

## Estrutura de Exemplo Postman Collection

```json
{
  "info": {
    "name": "API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Users",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/users"
      }
    },
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/users",
        "body": {
          "raw": "{\"name\": \"João\", \"email\": \"joao@test.com\"}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://api.example.com"
    }
  ]
}
```

---

## Próximos Passos

- [ ] Gerar testes automaticamente (IA)
- [ ] Mock de requests
- [ ] Integração com CI/CD
- [ ] Alerts e notificações
- [ ] Relatórios em PDF
- [ ] Análise de performance
- [ ] Observabilidade (traces, logs)

---

## Troubleshooting

| Erro | Solução |
|------|---------|
| PostgreSQL connection error | `sudo service postgresql start` ou `brew services start postgresql` |
| Port 3001 already in use | Altere `PORT` em backend/.env |
| Port 3002 already in use | Altere port em frontend/vite.config.ts |
| Módulos não encontrados | `rm -rf node_modules && npm install` |
| JWT error | Verifique `JWT_SECRET` em backend/.env |

---

## 🎯 Próxima Iteração

Próxima feature a implementar:

```
[ ] Suporte para OAuth2 / Google Sign-in
[ ] Testes negativos automáticos (erro handling)
[ ] Integração com Postman Web API
```

Veja guias detalhados em `/docs`
