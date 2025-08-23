# Project Search Endpoint Usage

## Overview
The project search endpoint has been converted from GET to POST and now supports pagination and search filtering for project names.

## Endpoints

### 1. Search Projects with Pagination (POST)
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

**Parameters:**
- `searchTerm` (optional): Search term for project name (case-insensitive)
- `page` (optional): Page number, defaults to 1
- `limit` (optional): Items per page, defaults to 10, max 100
- `status` (optional): Filter by project status
- `managerId` (optional): Filter by manager ID

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Web Application Project",
      "description": "A modern web application",
      "code": "WEB001",
      "managerId": "manager-uuid",
      "status": "ACTIVE",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-12-31T00:00:00Z",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 25,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

### 2. Get All Projects (GET) - Backward Compatibility
**Endpoint:** `GET /projects`

**Query Parameters:**
- `status` (optional): Filter by project status
- `managerId` (optional): Filter by manager ID

**Response:** Array of all projects (no pagination)

## Examples

### Search for projects containing "mobile" in the name
```bash
curl -X POST http://localhost:3000/projects/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "searchTerm": "mobile",
    "page": 1,
    "limit": 5
  }'
```

### Get projects with pagination and status filter
```bash
curl -X POST http://localhost:3000/projects/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "ACTIVE",
    "page": 2,
    "limit": 20
  }'
```

### Get all active projects (backward compatibility)
```bash
curl -X GET "http://localhost:3000/projects?status=ACTIVE" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Features

1. **Case-insensitive search**: Project names are searched using LIKE operator
2. **Pagination**: Configurable page size with reasonable limits
3. **Multiple filters**: Combine search term, status, and manager filters
4. **Backward compatibility**: Original GET endpoint still works
5. **Ordered results**: Projects are ordered by creation date (newest first)
6. **Comprehensive metadata**: Includes pagination info and total counts

## Notes

- The search is performed on the `name` field of projects
- Results are ordered by `createdAt` in descending order (newest first)
- Maximum page size is limited to 100 items
- All filters are optional and can be combined
- The endpoint requires JWT authentication
