# 📝 Guia de Desenvolvimento - TestAI

## Overview

TestAI é um **SaaS de automação de testes com IA**. Este documento descreve como desenvolver e estender a plataforma.

---

## 🏗️ Arquitetura

### Backend (NestJS + PostgreSQL)

```
Request
  ↓
Authentication (JWT)
  ↓
Controller (Route Handler)
  ↓
Service (Business Logic)
  ↓
Repository (TypeORM)
  ↓
Database (PostgreSQL)
```

**Módulos principais:**

1. **Auth Module** - Autenticação e autorização
2. **Collections Module** - Gerenciar Postman Collections
3. **Test Executions Module** - Executar testes e armazenar resultados

### Frontend (React + TypeScript)

```
App Router
  ↓
Page Component
  ↓
Store (Zustand)
  ↓
API Service (Axios)
  ↓
Backend API
```

---

## 🔧 Como Adicionar Nova Funcionalidade

### Exemplo: Adicionar suporte a variáveis de ambiente globais

#### Backend

**1. Criar entidade**

```typescript
// src/modules/variables/entities/variable.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('variables')
export class Variable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column('uuid')
  userId: string;
}
```

**2. Criar DTO**

```typescript
// src/modules/variables/dto/variable.dto.ts
export class CreateVariableDto {
  key: string;
  value: string;
}
```

**3. Criar service**

```typescript
// src/modules/variables/services/variables.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variable } from '../entities/variable.entity';

@Injectable()
export class VariablesService {
  constructor(
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
  ) {}

  async create(createVariableDto: CreateVariableDto, userId: string) {
    const variable = this.variableRepository.create({
      ...createVariableDto,
      userId,
    });
    return this.variableRepository.save(variable);
  }

  async findAll(userId: string) {
    return this.variableRepository.find({ where: { userId } });
  }
}
```

**4. Criar controller**

```typescript
// src/modules/variables/controllers/variables.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { VariablesService } from '../services/variables.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/variables')
@UseGuards(JwtAuthGuard)
export class VariablesController {
  constructor(private variablesService: VariablesService) {}

  @Post()
  create(@Body() createVariableDto: any, @Request() req) {
    return this.variablesService.create(createVariableDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.variablesService.findAll(req.user.id);
  }
}
```

**5. Criar module**

```typescript
// src/modules/variables/variables.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';
import { VariablesService } from './services/variables.service';
import { VariablesController } from './controllers/variables.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  providers: [VariablesService],
  controllers: [VariablesController],
  exports: [VariablesService],
})
export class VariablesModule {}
```

**6. Registrar module em AppModule**

```typescript
// src/app.module.ts
import { VariablesModule } from './modules/variables/variables.module';

@Module({
  imports: [
    // ... outros imports
    VariablesModule,
  ],
})
export class AppModule {}
```

#### Frontend

**1. Criar página**

```typescript
// src/pages/VariablesPage.tsx
import { useEffect, useState } from 'react';

export default function VariablesPage() {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    // Carregar variáveis
  }, []);

  return (
    <div>
      {/* UI */}
    </div>
  );
}
```

**2. Adicionar rota**

```typescript
// src/App.tsx
<Route path="/variables" element={token ? <VariablesPage /> : <Navigate to="/login" />} />
```

**3. Adicionar chamadas de API**

```typescript
// src/services/api.ts
export const variablesApi = {
  create: (data: any) => api.post('/api/variables', data),
  getAll: () => api.get('/api/variables'),
};
```

---

## 📚 Padrões e Boas Práticas

### Backend

- ✅ Sempre usar DTOs para validação
- ✅ Usar Guards para autenticação
- ✅ Separar lógica em Services
- ✅ Usar TypeORM com Repositories
- ✅ Documentar endpoints com @ApiOperation()

### Frontend

- ✅ Componentes funcionais com hooks
- ✅ State management com Zustand
- ✅ Chamadas de API centralizadas
- ✅ Tratamento de erros em try/catch
- ✅ Loading states adequados

---

## 🧪 Testes

### Backend

```bash
# Unit tests
npm run test

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend

```bash
# Unit tests com Jest
npm run test

# Coverage
npm run test:cov
```

---

## 🚀 Deploy

### Backend (Docker)

```bash
# Build
docker build -t testaix-backend .

# Run
docker run -p 3001:3001 --env-file .env testaix-backend
```

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy pasta dist/
```

---

## 📋 Checklist para Nova Feature

- [ ] Entidade criada no banco de dados
- [ ] DTO com validações
- [ ] Service com lógica
- [ ] Controller com endpoints
- [ ] Module criado e registrado
- [ ] Testes unitários
- [ ] Documentação em Swagger
- [ ] Página/Componente frontend
- [ ] API client
- [ ] Tratamento de erros
- [ ] Testes E2E

---

## 🐛 Debugging

### Backend

```typescript
// Log to console (development)
console.log('Debug:', data);

// Use debugger
// Coloque breakpoint e rode: node --inspect-brk
```

### Frontend

```typescript
// Console log
console.log('State:', variable);

// React DevTools
// Use extensão no Chrome
```

---

## 📞 Suporte

Veja documentação completa em `/docs`
