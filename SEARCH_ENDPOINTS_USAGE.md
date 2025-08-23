# Search Endpoints Usage Guide

## Overview
All three modules (Projects, Teams, and Users) now support pagination and search filtering with POST endpoints while maintaining backward compatibility with GET endpoints.

## Projects Module

### Search Projects with Pagination
**Endpoint:** `POST /projects/search`

**Request Body:**
```json
{
  "searchTerm": "web app",
  "page": 1,
  "limit": 10,
  "status": "ACTIVE",
  "managerId": "uuid-string"
}
```

**Features:**
- Search by project name (case-insensitive)
- Filter by status and manager ID
- Pagination with configurable page size
- Results ordered by creation date (newest first)

## Teams Module

### Search Teams with Pagination
**Endpoint:** `POST /teams/search`

**Request Body:**
```json
{
  "searchTerm": "development",
  "page": 1,
  "limit": 10,
  "projectId": "uuid-string",
  "leadId": "uuid-string"
}
```

**Features:**
- Search by team name (case-insensitive)
- Filter by project ID and lead ID
- Pagination with configurable page size
- Results ordered by creation date (newest first)

## Users Module

### Search Users with Pagination
**Endpoint:** `POST /users/search`

**Request Body:**
```json
{
  "searchTerm": "john doe",
  "page": 1,
  "limit": 10,
  "department": "Engineering",
  "position": "Developer"
}
```

**Features:**
- Search by first name, last name, or email (case-insensitive)
- Filter by department and position
- Pagination with configurable page size
- Results ordered by creation date (newest first)
- Password field is automatically excluded from results

## Common Parameters

All search endpoints support these common parameters:

| Parameter | Type | Required | Default | Max | Description |
|-----------|------|----------|---------|-----|-------------|
| `searchTerm` | string | No | - | - | Search term for name/email filtering |
| `page` | number | No | 1 | - | Page number (starts from 1) |
| `limit` | number | No | 10 | 100 | Items per page |

## Response Format

All search endpoints return the same pagination structure:

```json
{
  "data": [...], // Array of items
  "page": 1,     // Current page
  "limit": 10,   // Items per page
  "total": 25,   // Total matching items
  "totalPages": 3, // Total pages
  "hasNextPage": true,  // Has next page
  "hasPrevPage": false  // Has previous page
}
```

## Backward Compatibility

All modules maintain their original GET endpoints for backward compatibility:

- `GET /projects` - Get all projects (with optional query filters)
- `GET /teams` - Get all teams (with optional query filters)
- `GET /users` - Get all users

## Examples

### Search for projects containing "mobile"
```bash
curl -X POST http://localhost:3000/projects/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"searchTerm": "mobile", "page": 1, "limit": 5}'
```

### Search for teams in a specific project
```bash
curl -X POST http://localhost:3000/teams/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"projectId": "project-uuid", "page": 1, "limit": 20}'
```

### Search for users by department
```bash
curl -X POST http://localhost:3000/users/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"department": "Engineering", "page": 2, "limit": 15}'
```

## Notes

- All search endpoints require JWT authentication
- Search is case-insensitive using SQL LIKE operator
- Maximum page size is limited to 100 items
- Results are consistently ordered by creation date (newest first)
- All filters are optional and can be combined
- The original GET endpoints remain unchanged for backward compatibility
