# Pagination and Filtering Usage Guide

## Overview
All three modules (Modules, Permissions, and Roles) now support comprehensive pagination and search filtering with POST endpoints while maintaining backward compatibility with GET endpoints.

## Common Features

### Pagination Parameters
All search endpoints support these common parameters:
- **`page`**: Page number (starts from 1, default: 1)
- **`limit`**: Items per page (default: 10, max: 100)

### Response Format
All search endpoints return the same pagination structure:
```json
{
  "data": [...],        // Array of items
  "page": 1,           // Current page
  "limit": 10,         // Items per page
  "total": 25,         // Total matching items
  "totalPages": 3,     // Total pages
  "hasNextPage": true, // Has next page
  "hasPrevPage": false // Has previous page
}
```

## 1. Modules Module

### Search Modules with Pagination
**Endpoint:** `POST /modules/search`

**Request Body:**
```json
{
  "searchTerm": "user management",
  "page": 1,
  "limit": 10,
  "isActive": true
}
```

**Filters:**
- **`searchTerm`**: Search in module name or code (case-insensitive)
- **`isActive`**: Filter by active status (true/false)

**Example Usage:**
```bash
curl -X POST http://localhost:3000/modules/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "searchTerm": "user",
    "page": 1,
    "limit": 5
  }'
```

## 2. Permissions Module

### Search Permissions with Pagination
**Endpoint:** `POST /permissions/search`

**Request Body:**
```json
{
  "searchTerm": "create user",
  "page": 1,
  "limit": 10,
  "module": "USER",
  "action": "CREATE",
  "isActive": true
}
```

**Filters:**
- **`searchTerm`**: Search in permission name or action (case-insensitive)
- **`module`**: Filter by module name
- **`action`**: Filter by action type
- **`isActive`**: Filter by active status (true/false)

**Example Usage:**
```bash
curl -X POST http://localhost:3000/permissions/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "module": "USER",
    "action": "CREATE",
    "page": 1,
    "limit": 20
  }'
```

## 3. Roles Module

### Search Roles with Pagination
**Endpoint:** `POST /roles/search`

**Request Body:**
```json
{
  "searchTerm": "admin",
  "page": 1,
  "limit": 10,
  "level": "ADMIN",
  "isActive": true
}
```

**Filters:**
- **`searchTerm`**: Search in role name or level (case-insensitive)
- **`level`**: Filter by role level
- **`isActive`**: Filter by active status (true/false)

**Example Usage:**
```bash
curl -X POST http://localhost:3000/roles/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "level": "ADMIN",
    "page": 2,
    "limit": 15
  }'
```

## Advanced Search Examples

### 1. Search for Active Modules with Specific Terms
```bash
curl -X POST http://localhost:3000/modules/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "searchTerm": "management",
    "isActive": true,
    "page": 1,
    "limit": 25
  }'
```

### 2. Search for Permissions by Module and Action
```bash
curl -X POST http://localhost:3000/permissions/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "module": "PROJECT",
    "action": "READ",
    "isActive": true,
    "page": 1,
    "limit": 50
  }'
```

### 3. Search for Roles by Level with Pagination
```bash
curl -X POST http://localhost:3000/roles/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "level": "USER",
    "isActive": true,
    "page": 3,
    "limit": 10
  }'
```

## Backward Compatibility

All modules maintain their original GET endpoints for backward compatibility:

- **`GET /modules`** - Get all modules
- **`GET /modules/active`** - Get active modules only
- **`GET /permissions`** - Get all permissions (with optional `?module=USER` query)
- **`GET /roles`** - Get all roles

## Search Features

### 1. **Case-Insensitive Search**
All search terms are case-insensitive using SQL LIKE operator

### 2. **Multiple Filter Combinations**
Filters can be combined for precise results

### 3. **Flexible Pagination**
Configurable page size with reasonable limits (max 100 items)

### 4. **Consistent Ordering**
Results are ordered by creation date (newest first)

### 5. **Comprehensive Metadata**
Full pagination information including total counts and navigation hints

## Frontend Integration Tips

### 1. **Search Form Design**
- Include search term input
- Add filter dropdowns for specific fields
- Include pagination controls
- Show active filters with remove options

### 2. **Results Display**
- Show total count and current page info
- Implement pagination navigation
- Display loading states during search
- Handle empty results gracefully

### 3. **URL State Management**
- Consider encoding search parameters in URL
- Enable browser back/forward navigation
- Share search results via URL

### 4. **Performance Optimization**
- Implement debounced search input
- Cache search results when appropriate
- Use pagination to limit data transfer

## Error Handling

All endpoints return appropriate HTTP status codes:
- **200**: Success with results
- **400**: Bad request (validation errors)
- **401**: Unauthorized (missing/invalid JWT)
- **500**: Internal server error

## Rate Limiting

All endpoints are subject to the application's rate limiting configuration:
- Default: 100 requests per minute per IP
- Configurable via environment variables

## Notes

- All search endpoints require JWT authentication
- Search is performed using SQL LIKE operator for flexibility
- Maximum page size is limited to 100 items for performance
- Results are consistently ordered by creation date (newest first)
- All filters are optional and can be combined
- Original GET endpoints remain unchanged for backward compatibility
