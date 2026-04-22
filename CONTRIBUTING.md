# 👋 Contributing to TestAI

Obrigado por querer contribuir! Seguindo estas diretrizes ajudaremos a manter o projeto melhor.

## 🚀 Como Começar

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/testaix.git
cd testaix
```

### 2. Setup Local

Ver [QUICKSTART.md](../QUICKSTART.md) para setup rápido.

### 3. Criar Branch

```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bug
```

## 📋 Convenções

### Git Commits

Usar formato convencional:

```
type(scope): description

[optional body]
[optional footer]
```

Exemplos:
- `feat(auth): add two-factor authentication`
- `fix(collections): handle invalid postman json`
- `docs: update setup guide`
- `refactor(test): simplify error handling`

**Types:**
- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação (sem mudar lógica)
- `refactor`: Refatoração (sem bugs/features)
- `test`: Adicionar testes
- `chore`: Atualizações de dependencies
- `ci`: CI/CD changes

### Code Style

#### Backend (TypeScript/NestJS)

```typescript
// ✅ Bom
export class AuthService {
  constructor(private userRepository: Repository<User>) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    // Implementation...
  }
}

// ❌ Ruim
export class authService {
  constructor(private users: Repository<any>) {}
  async login(e: any, p: any) {
    // Implementation...
  }
}
```

**Regras:**
- Use `PascalCase` para classes
- Use `camelCase` para métodos/variáveis
- Use `UPPER_SNAKE_CASE` para constantes
- Type everything (sem `any`)
- Adicione JSDoc para métodos públicos

#### Frontend (React/TypeScript)

```typescript
// ✅ Bom
interface UserProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export function UserCard({ id, name, onDelete }: UserProps) {
  return (
    <div onClick={() => onDelete(id)}>
      <p>{name}</p>
    </div>
  );
}

// ❌ Ruim
export function userCard(props: any) {
  return (
    <div onClick={() => props.onDelete(props.id)}>
      <p>{props.name}</p>
    </div>
  );
}
```

**Regras:**
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Naming: `ComponentName.tsx` (não `componentName.tsx`)

### Linting & Formatting

```bash
# Backend
cd backend && npm run lint -- --fix
cd backend && npm run format

# Frontend
cd frontend && npm run lint -- --fix
cd frontend && npm run format
```

## 🧪 Testes

### Backend

```bash
cd backend

# Unit tests
npm run test

# Unit tests com watch
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend

```bash
cd frontend

# Unit tests
npm run test

# Coverage
npm run test:cov
```

**Cobertura mínima esperada:** 80%

## 📝 Pull Request

### Before Submitting

- [ ] Branch atualizado com `main`
- [ ] Testes passando (`npm test`)
- [ ] Linting OK (`npm run lint`)
- [ ] Documentação atualizada
- [ ] Commits bem estruturados

### PR Template

```markdown
## 🎯 Objetivo

Descrever o que foi implementado/corrigido

## 🔧 Como Testar

Passo a passo para testar a mudança

## ✅ Checklist

- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem breaking changes
- [ ] Código reviewed

## 📸 Screenshots (se aplicável)

Adicione screenshots da UI

## 🔗 Links

Link para issue/ticket se houver
```

## 🐛 Reportar Bugs

Use GitHub Issues com template:

```markdown
### Description
Descrição clara do bug

### Steps to Reproduce
1. ...
2. ...
3. ...

### Expected Behavior
O que deveria acontecer

### Actual Behavior
O que está acontecendo

### Environment
- OS: Windows/Mac/Linux
- Node: 18.x
- Browser: Chrome 120

### Screenshots
(se aplicável)
```

## ✨ Sugestões de Features

Use GitHub Issues com template:

```markdown
### Problem Statement
Qual é o problema?

### Proposed Solution
Como você sugere resolver?

### Alternatives Considered
Outras soluções possíveis?

### Additional Context
Contexto adicional
```

## 🎓 Arquitetura

Antes de adicionar features grandes, entenda:

- [Backend Architecture](../docs/DEVELOPMENT.md#arquitetura)
- [Data Model](../docs/DEVELOPMENT.md)
- [API Design](../README.md#endpoints-key)

## 📚 Documentação

Se adicionar features, atualize:

- [ ] [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md)
- [ ] [README.md](../README.md)
- [ ] [QUICKSTART.md](../QUICKSTART.md)
- [ ] Swagger comments (backend)

## 🤝 Code Review

Nosso processo:

1. Submeta PR
2. Automated checks (lint, tests)
3. Revisão de código (1-2 dias)
4. Feedback incorporado
5. Merge

## 📞 Precisando de Ajuda?

- 📧 Email: jefferson.reis@example.com
- 💬 Discussions: GitHub Discussions
- 🐛 Issues: Use templates

---

**Obrigado por contribuir! 🎉**
