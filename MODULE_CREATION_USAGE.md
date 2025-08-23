# Module Creation System Usage Guide

## Overview
The Module Creation system allows you to create and manage modules that are referenced when creating permissions. This provides a structured way to organize permissions by functional areas of your application.

## Module Schema

Each module has the following structure:
- **id**: Unique UUID identifier
- **name**: Human-readable module name (e.g., "User Management")
- **description**: Optional description of the module's purpose
- **code**: Unique code identifier (e.g., "USER_MGMT")
- **isActive**: Boolean flag to enable/disable the module
- **createdAt/updatedAt**: Timestamps

## API Endpoints

### 1. Create Module
**Endpoint:** `POST /modules`

**Request Body:**
```json
{
  "name": "User Management",
  "description": "Module for managing users, roles, and permissions",
  "code": "USER_MGMT"
}
```

**Response:** Created module object

### 2. Get All Modules
**Endpoint:** `GET /modules`

**Response:** Array of all modules

### 3. Get Active Modules
**Endpoint:** `GET /modules/active`

**Response:** Array of active modules only

### 4. Get Module by ID
**Endpoint:** `GET /modules/:id`

**Response:** Single module object

### 5. Update Module
**Endpoint:** `PATCH /modules/:id`

**Request Body:** Partial module data
```json
{
  "description": "Updated description",
  "isActive": false
}
```

### 6. Delete Module
**Endpoint:** `DELETE /modules/:id`

**Response:** Success message

## Permission Integration

### Updated Permission Schema
Permissions now reference modules via `moduleId` instead of a string:

```json
{
  "id": "uuid",
  "name": "CREATE_USER",
  "description": "Permission to create new users",
  "moduleId": "module-uuid",
  "action": "CREATE",
  "isActive": true
}
```

### New Permission Endpoints

#### Get Permissions with Module Info
**Endpoint:** `GET /permissions/with-modules`

**Response:** Permissions with embedded module details
```json
[
  {
    "id": "permission-uuid",
    "name": "CREATE_USER",
    "moduleId": "module-uuid",
    "action": "CREATE",
    "module": {
      "id": "module-uuid",
      "name": "User Management",
      "code": "USER_MGMT"
    }
  }
]
```

#### Get Permission by ID with Module
**Endpoint:** `GET /permissions/:id/with-module`

**Response:** Single permission with module details

#### Filter Permissions by Module
**Endpoint:** `GET /permissions?moduleId=module-uuid`

**Response:** Array of permissions for the specified module

## Workflow for Creating Permissions

### Step 1: Create a Module
```bash
curl -X POST http://localhost:3000/modules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Project Management",
    "description": "Module for managing projects and teams",
    "code": "PROJECT_MGMT"
  }'
```

### Step 2: Create Permissions for the Module
```bash
curl -X POST http://localhost:3000/permissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "CREATE_PROJECT",
    "description": "Permission to create new projects",
    "moduleId": "module-uuid-from-step-1",
    "action": "CREATE"
  }'
```

```bash
curl -X POST http://localhost:3000/permissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "UPDATE_PROJECT",
    "description": "Permission to update existing projects",
    "moduleId": "module-uuid-from-step-1",
    "action": "UPDATE"
  }'
```

## Example Module-Permission Structure

### User Management Module
- **Module:** User Management (USER_MGMT)
- **Permissions:**
  - CREATE_USER (CREATE)
  - READ_USER (READ)
  - UPDATE_USER (UPDATE)
  - DELETE_USER (DELETE)
  - ASSIGN_ROLE (ASSIGN)

### Project Management Module
- **Module:** Project Management (PROJECT_MGMT)
- **Permissions:**
  - CREATE_PROJECT (CREATE)
  - READ_PROJECT (READ)
  - UPDATE_PROJECT (UPDATE)
  - DELETE_PROJECT (DELETE)
  - ASSIGN_TEAM (ASSIGN)

### Team Management Module
- **Module:** Team Management (TEAM_MGMT)
- **Permissions:**
  - CREATE_TEAM (CREATE)
  - READ_TEAM (READ)
  - UPDATE_TEAM (UPDATE)
  - DELETE_TEAM (DELETE)
  - ADD_MEMBER (ADD)

## Benefits

1. **Structured Organization**: Permissions are logically grouped by functional areas
2. **Easier Management**: Bulk operations on permissions by module
3. **Better UX**: Frontend can show permissions organized by modules
4. **Scalability**: Easy to add new modules as the application grows
5. **Consistency**: Standardized permission naming and organization

## Validation Rules

- Module names must be unique
- Module codes must be unique
- Module names and codes have length limits (100 and 50 characters respectively)
- When creating permissions, the referenced module must exist
- Cannot delete modules that have associated permissions (referential integrity)

## Frontend Integration

When building the frontend for permission management:

1. **Module Selection**: Show a dropdown of available modules when creating permissions
2. **Permission Listing**: Group permissions by module for better organization
3. **Bulk Operations**: Allow enabling/disabling all permissions for a specific module
4. **Search/Filter**: Filter permissions by module name or code

## Migration Notes

If you have existing permissions with string-based module references:

1. Create the corresponding modules first
2. Update the permission schema to use moduleId
3. Migrate existing data to reference the new module IDs
4. Update any frontend code that references the old module string field
