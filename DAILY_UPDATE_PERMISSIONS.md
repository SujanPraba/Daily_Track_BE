# Daily Update Permission Logic

## Overview

The daily update system implements a two-tier permission system that controls what users can see and filter when searching for daily updates.

## Permission Types

### 1. VIEW_DAILY_UPDATES_FULL
- **Description**: Users can see all daily updates across their assigned projects
- **Access Level**: Full access to view updates from any user within their projects
- **Filtering**: Can filter by any user, team, or project they have access to
- **Use Case**: Managers, Team Leads, and Administrators who need oversight

### 2. VIEW_DAILY_UPDATES
- **Description**: Users can only see their own daily updates
- **Access Level**: Restricted access - only personal updates
- **Filtering**: userId filter is ignored and restricted to current user
- **Use Case**: Developers and regular team members

## Implementation Details

### Permission Check Flow

```typescript
// 1. Check both permissions
const hasFullPermission = await this.userService.hasPermission(
  currentUserId,
  'VIEW_DAILY_UPDATES_FULL'
);

const hasBasicPermission = await this.userService.hasPermission(
  currentUserId,
  'VIEW_DAILY_UPDATES'
);

// 2. Reject if no permissions
if (!hasBasicPermission && !hasFullPermission) {
  return emptyResult;
}
```

### Search Criteria Handling

#### User ID Filter
```typescript
if (searchDto.userId) {
  if (hasFullPermission) {
    // Can filter by any user within their projects
    searchCriteria.userId = searchDto.userId;
  } else {
    // Ignore requested userId, show only own updates
    searchCriteria.userId = currentUserId;
  }
} else if (!hasFullPermission) {
  // No userId specified, restrict to own updates
  searchCriteria.userId = currentUserId;
}
```

#### Project ID Filter
```typescript
if (searchDto.projectId) {
  // Check if user has access to specified project
  if (!hasFullPermission && !projectIds.includes(searchDto.projectId)) {
    return emptyResult; // Access denied
  }
  searchCriteria.projectId = searchDto.projectId;
} else if (!hasFullPermission) {
  // Restrict to user's assigned projects
  searchCriteria.projectId = projectIds;
}
```

### Security Measures

1. **Double Filtering**: Results are filtered both at the database level and application level
2. **Project Access Validation**: Users can only access projects they're assigned to
3. **Permission Enforcement**: userId filters are enforced based on permission level
4. **Audit Logging**: All search operations are logged with permission details

## User Roles and Permissions

### Super Admin
- **Permissions**: All permissions including VIEW_DAILY_UPDATES_FULL
- **Access**: Can see all updates across all projects

### Project Manager
- **Permissions**: All permissions including VIEW_DAILY_UPDATES_FULL
- **Access**: Can see all updates within their assigned projects

### Team Lead
- **Permissions**: All permissions including VIEW_DAILY_UPDATES_FULL
- **Access**: Can see all updates within their assigned projects

### Developer
- **Permissions**: Only VIEW_DAILY_UPDATES (basic permission)
- **Access**: Can only see their own updates

## API Endpoint

### POST /daily-updates/search

**Request Body**: `SearchDailyUpdatesDto`
```typescript
{
  userId?: string;        // Ignored for users without VIEW_DAILY_UPDATES_FULL
  projectId?: string;     // Must be user's assigned project
  teamId?: string;        // Applied if specified
  status?: string;        // Applied if specified
  tickets?: string;       // Applied if specified
  startDate?: string;     // Applied if specified
  endDate?: string;       // Applied if specified
  page?: number;          // Pagination
  limit?: number;         // Pagination
}
```

**Response**: `PaginatedDailyUpdatesDto`
```typescript
{
  data: DailyUpdateWithTeamDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

## Example Scenarios

### Scenario 1: Manager Search (VIEW_DAILY_UPDATES_FULL)
```typescript
// User: Bala (Manager)
// Permission: VIEW_DAILY_UPDATES_FULL
// Search: { userId: "user-123", projectId: "project-456" }

// Result: Can see updates from user-123 in project-456
// Access: Full access to filter by any user within their projects
```

### Scenario 2: Developer Search (VIEW_DAILY_UPDATES)
```typescript
// User: Shyaam (Developer)
// Permission: VIEW_DAILY_UPDATES
// Search: { userId: "user-123", projectId: "project-456" }

// Result: userId filter ignored, shows only Shyaam's updates
// Access: Restricted to own updates only
```

### Scenario 3: Unauthorized Project Access
```typescript
// User: Developer without access to project-789
// Search: { projectId: "project-789" }

// Result: Empty result (access denied)
// Reason: User not assigned to specified project
```

## Logging and Debugging

The system provides comprehensive logging for debugging permission issues:

```typescript
🔍 Search request from user {userId} with criteria: {searchDto}
🔐 User permissions - VIEW_DAILY_UPDATES_FULL: {boolean}, VIEW_DAILY_UPDATES: {boolean}
📋 User {userId} has access to projects: {projectIds}
✅/❌ Permission checks and filter applications
👁️ VIEW_DAILY_UPDATES_FULL: Showing {count} updates across user's projects
👤 VIEW_DAILY_UPDATES: Showing {count} updates for user {userId} only
```

## Best Practices

1. **Always check permissions before applying filters**
2. **Use database-level filtering for performance**
3. **Apply application-level filtering for security**
4. **Log all permission decisions for audit trails**
5. **Validate project access before processing requests**

## Testing

To test the permission logic:

1. **Seed the database** with the provided seed data
2. **Login as different users** with different permission levels
3. **Test search endpoints** with various filter combinations
4. **Verify access control** works as expected
5. **Check logs** for permission decision details

## Troubleshooting

### Common Issues

1. **Empty results for managers**: Check if user has VIEW_DAILY_UPDATES_FULL permission
2. **Developers seeing others' updates**: Verify permission assignment in database
3. **Project access denied**: Ensure user is assigned to the requested project
4. **Permission not working**: Check role-permission assignments in database

### Debug Steps

1. Check user permissions in database
2. Verify user-project assignments
3. Review application logs for permission decisions
4. Test with different user accounts
5. Verify seed data is correctly applied
