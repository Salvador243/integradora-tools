# 📬 Colección Postman - MFES Tools API

Base URL: `http://localhost:3002`

---

## 🔧 TOOL TYPES

### 1. Create Tool Type
```bash
curl --location 'http://localhost:3002/tool-types/create' \
--header 'Content-Type: application/json' \
--data '{
    "code": "TOOL-001",
    "name": "Martillo",
    "categoryId": 1,
    "status": "active",
    "image": "https://example.com/martillo.jpg",
    "garageId": 1
}'
```

### 2. Get All Tool Types (Paginated)
```bash
curl --location 'http://localhost:3002/tool-types/get-all?page=1&limit=10'
```

### 3. Get Tool Type by UUID
```bash
curl --location 'http://localhost:3002/tool-types/get-by-uuid/123e4567-e89b-12d3-a456-426614174000'
```

### 4. Update Tool Type
```bash
curl --location --request PUT 'http://localhost:3002/tool-types/update-tool-types/123e4567-e89b-12d3-a456-426614174000' \
--header 'Content-Type: application/json' \
--data '{
    "code": "TOOL-001",
    "name": "Martillo Actualizado",
    "categoryId": 1,
    "status": "inactive",
    "image": "https://example.com/martillo-new.jpg",
    "garageId": 2
}'
```

### 5. Delete Tool Type
```bash
curl --location --request DELETE 'http://localhost:3002/tool-types/delete-tool-types/123e4567-e89b-12d3-a456-426614174000'
```

---

## 🔨 TOOL INSTANCES

### 1. Create Tool Instance
```bash
curl --location 'http://localhost:3002/tool-instances/create' \
--header 'Content-Type: application/json' \
--data '{
    "toolTypeId": "123e4567-e89b-12d3-a456-426614174000",
    "serialCode": "PZ-001",
    "garageId": 1,
    "conditionId": 1,
    "status": "available",
    "lastAssignedUser": "Juan Perez"
}'
```

### 2. Get All Tool Instances (Paginated)
```bash
curl --location 'http://localhost:3002/tool-instances/get-all?page=1&limit=10'
```

### 3. Get Tool Instance by UUID
```bash
curl --location 'http://localhost:3002/tool-instances/get-by-uuid/123e4567-e89b-12d3-a456-426614174000'
```

### 4. Update Tool Instance
```bash
curl --location --request PUT 'http://localhost:3002/tool-instances/update-tool-instances/123e4567-e89b-12d3-a456-426614174000' \
--header 'Content-Type: application/json' \
--data '{
    "toolTypeId": "123e4567-e89b-12d3-a456-426614174000",
    "serialCode": "PZ-001",
    "garageId": 1,
    "conditionId": 2,
    "status": "maintenance",
    "lastAssignedUser": "Maria Lopez"
}'
```

### 5. Delete Tool Instance
```bash
curl --location --request DELETE 'http://localhost:3002/tool-instances/delete-tool-instances/123e4567-e89b-12d3-a456-426614174000'
```

---

## 📋 ASSIGNMENTS

### 1. Create Assignment
```bash
curl --location 'http://localhost:3002/assignments/create' \
--header 'Content-Type: application/json' \
--data '{
    "toolInstanceId": "123e4567-e89b-12d3-a456-426614174000",
    "userAssigned": "Carlos Rodriguez",
    "fechaSalida": "2025-10-08T10:00:00Z",
    "conditionIdSalida": 1,
    "fechaRegreso": null,
    "conditionIdRegreso": null,
    "status": "open"
}'
```

### 2. Get All Assignments (Paginated)
```bash
curl --location 'http://localhost:3002/assignments/get-all?page=1&limit=10'
```

### 3. Get Assignment by UUID
```bash
curl --location 'http://localhost:3002/assignments/get-by-uuid/123e4567-e89b-12d3-a456-426614174000'
```

### 4. Update Assignment (Close Assignment)
```bash
curl --location --request PUT 'http://localhost:3002/assignments/update-assignments/123e4567-e89b-12d3-a456-426614174000' \
--header 'Content-Type: application/json' \
--data '{
    "toolInstanceId": "123e4567-e89b-12d3-a456-426614174000",
    "userAssigned": "Carlos Rodriguez",
    "fechaSalida": "2025-10-08T10:00:00Z",
    "fechaRegreso": "2025-10-08T18:00:00Z",
    "conditionIdSalida": 1,
    "conditionIdRegreso": 1,
    "status": "closed"
}'
```

### 5. Delete Assignment
```bash
curl --location --request DELETE 'http://localhost:3002/assignments/delete-assignments/123e4567-e89b-12d3-a456-426614174000'
```

---

## 📜 TOOL HISTORY

### 1. Create Tool History
```bash
curl --location 'http://localhost:3002/tool-history/create' \
--header 'Content-Type: application/json' \
--data '{
    "toolInstanceId": "123e4567-e89b-12d3-a456-426614174000",
    "garageId": 1,
    "userAssigned": "Ana Martinez",
    "conditionId": 1,
    "fechaEvento": "2025-10-08T14:30:00Z",
    "tipoEvento": "assigned"
}'
```

### 2. Get All Tool History (Paginated)
```bash
curl --location 'http://localhost:3002/tool-history/get-all?page=1&limit=10'
```

### 3. Get Tool History by Tool Instance ID
```bash
curl --location 'http://localhost:3002/tool-history/get-by-tool-instance/123e4567-e89b-12d3-a456-426614174000'
```

### 4. Get Tool History by UUID
```bash
curl --location 'http://localhost:3002/tool-history/get-by-uuid/123e4567-e89b-12d3-a456-426614174000'
```

---

## 📝 Notas

### Status Values:
- **Tool Types**: `active`, `inactive`
- **Tool Instances**: `available`, `assigned`, `maintenance`, `lost`
- **Assignments**: `open`, `closed`
- **Tool History - Tipo Evento**: `assigned`, `returned`, `maintenance`, `transferred`

### Formato de Fechas:
Usar formato ISO 8601: `2025-10-08T14:30:00Z`

### UUIDs de Ejemplo:
Reemplaza `123e4567-e89b-12d3-a456-426614174000` con los UUIDs reales que obtengas de las respuestas.

---

## 🚀 Importar a Postman

1. Copia cada cURL
2. En Postman: **Import** → **Raw text** → Pega el cURL
3. O usa **Import** → **Paste cURL**
4. Organiza en carpetas: Tool Types, Tool Instances, Assignments, Tool History
