# 🏗️ MFES Tools - Clean Architecture Backend

## 📋 Descripción

Backend del módulo **Tools** del sistema MFES, construido con **NestJS** siguiendo los principios de **Clean Architecture**. Este proyecto implementa una arquitectura en capas que garantiza separación de responsabilidades, mantenibilidad y escalabilidad.

## 🎯 Arquitectura

Este proyecto sigue los principios de **Clean Architecture** organizados en 4 capas principales:

### 1. **Domain Layer** (Capa de Dominio)
- **Responsabilidad**: Lógica de negocio pura
- **Ubicación**: `src/domain/`
- **Características**:
  - Entidades sin decoradores (TypeScript puro)
  - Interfaces de repositorios
  - Sin dependencias externas
  - Reglas de negocio centralizadas

### 2. **Application Layer** (Capa de Aplicación)
- **Responsabilidad**: Casos de uso y orquestación
- **Ubicación**: `src/application/`
- **Características**:
  - Un archivo por caso de uso (CRUD)
  - Orquestación de lógica de negocio
  - Depende solo de Domain
  - Servicios de aplicación

### 3. **Infrastructure Layer** (Capa de Infraestructura)
- **Responsabilidad**: Implementaciones técnicas
- **Ubicación**: `src/infrastructure/`
- **Características**:
  - Entidades de TypeORM (con decoradores)
  - Implementación de repositorios
  - Conexión a base de datos
  - Servicios externos

### 4. **Presentation Layer** (Capa de Presentación)
- **Responsabilidad**: Controladores y DTOs
- **Ubicación**: `src/presentation/`
- **Características**:
  - Controllers delgados
  - DTOs con validaciones
  - Módulos de NestJS
  - Manejo de requests/responses

## 📂 Estructura de Carpetas

```
src/
├── domain/                          # Capa de Dominio
│   ├── entities/                    # Entidades de negocio puras
│   │   └── tools/
│   │       └── tools.entity.ts
│   └── repositories/                # Interfaces de repositorios
│       └── tools.repository.ts
│
├── application/                     # Capa de Aplicación
│   ├── services/                    # Servicios de aplicación
│   └── use-cases/                   # Casos de uso
│       └── tools/
│           ├── create-tools.use-case.ts
│           ├── get-tools.use-case.ts
│           ├── get-tools-by-id.use-case.ts
│           ├── update-tools.use-case.ts
│           ├── delete-tools.use-case.ts
│           └── exports-provider.use-case.ts
│
├── infrastructure/                  # Capa de Infraestructura
│   ├── database/
│   │   ├── database.module.ts       # Configuración de TypeORM
│   │   └── entities/                # Entidades de TypeORM
│   │       └── tools.entity.ts
│   ├── repositories/                # Implementaciones de repositorios
│   │   └── api-tools.repository.ts
│   └── services/                    # Servicios externos
│
├── presentation/                    # Capa de Presentación
│   ├── controllers/                 # Controladores REST
│   │   └── tools/
│   │       └── tools.controller.ts
│   ├── dtos/                        # Data Transfer Objects
│   │   └── tools/
│   │       └── create-tools.dto.ts
│   └── modules/                     # Módulos de NestJS
│       └── tools.module.ts
│
├── shared/                          # Recursos compartidos
│   └── filters/
│       └── http-exception.filter.ts
│
├── app.module.ts                    # Módulo raíz
└── main.ts                          # Punto de entrada
```

## 🔄 Flujo de Dependencias

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure ←────┘
```

**Reglas**:
- ✅ Domain NO depende de nada
- ✅ Application depende solo de Domain
- ✅ Infrastructure implementa interfaces de Domain
- ✅ Presentation orquesta todo usando inyección de dependencias

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18.x
- pnpm >= 8.x
- MySQL >= 8.x

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd tools
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz
cp .env.example .env
```

4. **Configurar base de datos**
Edita el archivo `.env` con tus credenciales:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=mfes_tools

# App
PORT=3001
NODE_ENV=development
```

## 📦 Dependencias Principales

```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "typeorm": "^0.3.0",
  "mysql2": "^3.0.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.0"
}
```

## 🏃 Ejecución

### Modo Desarrollo
```bash
pnpm run start:dev
```
La aplicación estará disponible en `http://localhost:3001`

### Modo Producción
```bash
# Build
pnpm run build

# Start
pnpm run start:prod
```

### Otros Comandos
```bash
# Desarrollo sin watch
pnpm run start

# Linter
pnpm run lint

# Formatear código
pnpm run format
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

## 📡 API Endpoints

### Tools Module

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/tools/create` | Crear una nueva herramienta |
| GET | `/tools/get-all?page=1&limit=10` | Obtener todas las herramientas (paginado) |
| GET | `/tools/get-by-uuid/:uuid` | Obtener herramienta por UUID |
| PUT | `/tools/update-tools/:uuid` | Actualizar herramienta |
| DELETE | `/tools/delete-tools/:uuid` | Eliminar herramienta |

### Formato de Respuesta

Todas las respuestas siguen el formato estándar:

```typescript
{
  "success": boolean,
  "message": string,
  "data": any
}
```

**Ejemplo de éxito**:
```json
{
  "success": true,
  "message": "Herramienta creada exitosamente",
  "data": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "nombre": "Martillo",
    "codigo": "TOOL-001",
    "status": true
  }
}
```

**Ejemplo de error**:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "El código ya existe",
  "timestamp": "2025-10-08T20:00:00.000Z"
}
```

## 🎨 Patrones de Diseño Implementados

### 1. **Repository Pattern**
- Abstracción de acceso a datos
- Interfaces en Domain, implementaciones en Infrastructure

### 2. **Dependency Injection**
- Inyección de dependencias con NestJS
- Uso de tokens para interfaces

### 3. **Use Case Pattern**
- Un caso de uso por operación
- Lógica de negocio encapsulada

### 4. **DTO Pattern**
- Validación de datos de entrada
- Transformación de datos

### 5. **Exception Filter**
- Manejo centralizado de errores
- Respuestas consistentes

## 🔧 Configuración de TypeORM

El proyecto usa TypeORM con MySQL. La configuración se encuentra en `infrastructure/database/database.module.ts`:

```typescript
{
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ToolsEntity],
  synchronize: NODE_ENV !== 'production', // ⚠️ Solo en desarrollo
  logging: NODE_ENV === 'development'
}
```

## 📝 Convenciones de Código

### Nomenclatura

- **Entidades de Dominio**: `NombreEntidad` (PascalCase, sin sufijo)
- **Entidades de TypeORM**: `NombreEntidadEntity` (PascalCase + Entity)
- **Interfaces de Repositorio**: `NombreEntidadRepository`
- **Implementaciones**: `ApiNombreEntidadRepository`
- **Use Cases**: `VerbNombreEntidadUseCase`
- **DTOs**: `VerbNombreEntidadDto`
- **Controllers**: `NombreEntidadController`

### Estructura de Archivos

- Un archivo por clase/interfaz
- Nombres en kebab-case: `create-tools.use-case.ts`
- Exports nombrados, no default

## 🛡️ Validaciones

Las validaciones se realizan en 3 niveles:

1. **DTOs** (Presentation): Validación de formato con `class-validator`
2. **Use Cases** (Application): Validación de reglas de negocio
3. **Database** (Infrastructure): Constraints de base de datos

## 🔐 Seguridad

- ✅ Validación global de DTOs
- ✅ CORS configurado
- ✅ Sanitización de inputs
- ✅ Exception filter para no exponer errores internos
- ⚠️ Implementar autenticación/autorización según necesidad

## 📚 Recursos

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 👥 Equipo de Desarrollo

- **Arquitectura**: Clean Architecture Pattern
- **Framework**: NestJS
- **ORM**: TypeORM
- **Base de Datos**: MySQL

## 📄 Licencia

Este proyecto es privado y pertenece al sistema MFES.

---

**Desarrollado con ❤️ usando Clean Architecture y NestJS**
